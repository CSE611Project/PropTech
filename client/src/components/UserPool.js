const cognito = require("amazon-cognito-identity-js");
const AWS = require('aws-sdk');

const poolData = {
  UserPoolId: "us-east-2_9sP4CUJwB",
  ClientId: "4lopeqiaq0bmrmvkccb09u6lq8"
}

const userPool = new cognito.CognitoUserPool(poolData);

{/*const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
const params = {
  "AttributesToGet": [],
  "Filter": "",
  "Limit": 10,
  "UserPoolId": "us-east-2_9sP4CUJwB"
}

cognitoidentityserviceprovider.listUsers(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
});*/}

export {cognito, userPool}
