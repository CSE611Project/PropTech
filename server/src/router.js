const config = require('./config.json');

const db = require('./database');
const emailer = require('./email');
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const aws = require('aws-sdk');
const cognito = new aws.CognitoIdentityServiceProvider({region:config.aws_region});
const jwt = require('jsonwebtoken');
const jwktopem = require('jwk-to-pem');

pems = {};

const setupJWK = async () => {
    const res = await fetch(`https://cognito-idp.${config.aws_region}.amazonaws.com/${config.cognito.userPoolId}/.well-known/jwks.json`);
    const data = await res.json();
    const { keys } = data;
    for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };
        const pem = jwktopem(jwk);
        pems[key_id] = pem;
    }
}

router.post('/signup', (req, res) => {
    let params = {
        ClientId: config.cognito.clientId,
        Username: req.body.email,
        Password: req.body.password,
        UserAttributes:[{
            Name: "custom:street_name", 
            Value: req.body.street_name
        },{
            Name: "custom:company_name",
            Value: req.body.company_name
        },{
            Name: "custom:suite_number",
            Value: req.body.suite_number
        },{
            Name: "custom:city",
            Value: req.body.city
        },{
            Name: "custom:state",
            Value: req.body.state
        },{
            Name: "custom:zipcode",
            Value: req.body.zipcode
        },{
            Name: "custom:is_activated",
            Value: "False"
        }]
    }

    cognito.signUp(params, (err, data) => {
        if(err) {
            res.json(err);
        }
    });
});

router.post('/activate', (req, res) => {
    let params = {
        UserPoolId: config.cognito.userPoolId,
        Username: req.body.email,
        UserAttributes: [
            {
                Name: "custom:is_activated",
                Value: "True"
            }
        ]
    }

    cognito.adminUpdateUserAttributes(params, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            let params = {
                GroupName: 'PropertyManager',
                UserPoolId: config.cognito.userPoolId,
                Username: req.body.email
            };
    
            cognito.adminAddUserToGroup(params, (err2, data2) => {
                if(err2) {
                    console.log(err2)
                } else {
                    db.insertUserIdToDatabase(req.body.email);
                  //  emailer.sentEmail(req.body.email, `The PropTech Web App Account associated with ${req.body.email} email has been approved`);
                    res.json(data);
                }
            })
        }
    })
});

router.delete('/reject', (req, res) => {
    let params = {
        UserPoolId: config.cognito.userPoolId,
        Username: req.body.email,
    }

    cognito.adminDeleteUser(params, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
});

router.post('/auth', (req, res) => {
    console.log(req.cookies);
    jwt.verify(req.body.accessToken, pems[jwt.decode(req.body.accessToken,{ complete: true }).header.kid], (err, accessData) => {
        if(err) {
            res.json(err);
        } else {
            res.cookie('authCookie', req.body.accessToken, { httpOnly: true });
            res.json({accessData});
        }
    });
    

    // let params = {
    //     AuthFlow: "USER_PASSWORD_AUTH",
    //     ClientId: config.cognito.clientId,
    //     AuthParameters: {
    //         "USERNAME": req.body.email,
    //         "PASSWORD": req.body.password
    //     }
    // }

    // cognito.initiateAuth(params, (err, data) => {
    //     if(err) {
    //         res.json(err);
    //     } else {
    //         console.log(data);
    //         res.json(data);
    //     }
    // })
});

setupJWK();

module.exports = router;