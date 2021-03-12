const db = require('./database');
const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const cognito = new aws.CognitoIdentityServiceProvider({region:'us-east-2'});

const config = require('./config.json');

router.post('/signup', (req, res) => {
    let params = {
        ClientId: config.cognito.clientId,
        Password: req.body.password,
        Username: req.body.email
    }

    cognito.signUp(params, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            let params = {
                UserPoolId: config.cognito.userPoolId,
                Username: req.body.email
            }
    
            cognito.adminDisableUser(params, (err2, data2) => {
                if(err) {
                    res.json(err2);
                } else {
                    res.json(data);
                }
            })
        }
    });
});

router.post('/enable', (req, res) => {
    let params = {
        UserPoolId: config.cognito.userPoolId,
        Username: req.body.email
    }

    cognito.adminEnableUser(params, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            db.insertUserIdToDatabase(req.body.email);
            res.json(data);
        }
    })
});

module.exports = router;