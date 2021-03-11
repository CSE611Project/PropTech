const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const cognito = new aws.CognitoIdentityServiceProvider({region:'us-east-2'});

const config = require('./config.json');

router.post('/signup', (request, response) => {
    const params = {
        ClientId: config.cognito.clientId,
        Password: request.body.password,
        Username: request.body.email
    }
    registerUser(params);
});

router.post('/enable', (request, response) => {
    enableUser(request.body.email);
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

const enableUser = async (username) => {
    return await new Promise((resolve, reject) => {
        const params = {
            UserPoolId: config.cognito.userPoolId,
            Username: username
        }

        cognito.adminEnableUser(params, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = router;