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
const { RDS } = require('aws-sdk');

pems = {};

const setupJWK = async () => {
    const res = await fetch(`https://cognito-idp.${config.aws_region}.amazonaws.com/${config.cognito.userPoolId}/.well-known/jwks.json`);
    const data = await res.json();
    const { keys } = data;
    for (var i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };
        const pem = jwktopem(jwk);
        pems[key_id] = pem;
    }
}

const verifyClient = async (req, res, callback) => {
    jwt.verify(req.cookies.authCookie, pems[jwt.decode(req.cookies.authCookie,{ complete: true }).header.kid], (err, accessData) => {
        if(err) {
            res.json(err);
        } else if(accessData.client_id == config.cognito.clientId) {
            callback(accessData["cognito:groups"][0], accessData.username);
        } else {
            res.json({
                "error": {
                  "message": "Client Id does not match"
                }
            })
        }
    })
}

// req json needs email, password, street_name, company_name, suite_number, city, state, zipcode
router.post('/signup', (req, res) => {
    var params = {
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

// req json needs email, username
// req cookie needs admin group
router.post('/activate', (req, res) => {
    verifyClient(req, res, (userType, adminUsername) => {
        if(userType != 'Admin') {
            res.json({
                "error": {
                  "message": "Improper permissions: not admin"
                }
            })
            return;
        }

        var params = {
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
                var params = {
                    GroupName: 'PropertyManager',
                    UserPoolId: config.cognito.userPoolId,
                    Username: req.body.email
                };

                cognito.adminAddUserToGroup(params, (err2, data2) => {
                    if(err2) {
                        res.json(err2)
                    } else {
                        db.insertUserIdToDatabase(req.body.username);
                        emailer.sentEmail(req.body.email, `The PropTech Web App Account associated with ${req.body.email} email has been approved`);
                        res.json(data);
                    }
                })
            }
        })
    })
});

// req json needs username
// req cookie needs admin group
router.delete('/reject', (req, res) => {
    verifyClient(req, res, (userType, adminUsername) => {
        if(userType != 'Admin') {
            res.json({
                "error": {
                  "message": "Improper permissions: not Admin"
                }
            })
            return;
        }

        var params = {
            UserPoolId: config.cognito.userPoolId,
            Username: req.body.username,
        }
    
        cognito.adminDeleteUser(params, (err, data) => {
            if(err) {
                res.json(err);
            } else {    // TODO delete from database
                res.json(data);
            }
        })
    })
});

// req json needs accessToken
router.post('/auth', (req, res) => {
    jwt.verify(req.body.accessToken, pems[jwt.decode(req.body.accessToken,{ complete: true }).header.kid], (err, accessData) => {
        if(err) {
            res.json(err);
        } else {
            if(accessData.client_id == config.cognito.clientId) {
                res.cookie('authCookie', req.body.accessToken, { httpOnly: true });
                res.json({accessData});
            } else {
                res.json({
                    "error": {
                      "message": "Client Id does not match"
                    }
                })
            }
        }
    });
});

setupJWK();

module.exports = router;