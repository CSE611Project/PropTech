const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const amazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognito = new aws.CognitoIdentityServiceProvider({region:'us-east-2'});

const config = require('./config.json');

const poolData = {
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.clientId
};

router.post('/signup', (request, response) => {
    const params = {
        ClientId: config.cognito.clientId,
        Password: request.body.password,
        Username: request.body.email
    }
    registerUser(params)
});

const registerUser = async (params) => {
    cognito.signUp(params, function(err, data) {
        if(err) {
            console.log(err, err.stack);
        } else {
            disableUser(params.Username);
            console.log(data);
        }
    });
}

const disableUser = async (username) => {
    return await new Promise((resolve, reject) => {
        const params = {
            UserPoolId: config.cognito.userPoolId,
            Username: username
        }

        cognito.adminDisableUser(params, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = router;