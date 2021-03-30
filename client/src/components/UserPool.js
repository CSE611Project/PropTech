const cognito = require("amazon-cognito-identity-js");

const poolData = {
  UserPoolId: "us-east-2_9sP4CUJwB",
  ClientId: "4lopeqiaq0bmrmvkccb09u6lq8"
}

const userPool = new cognito.CognitoUserPool(poolData);
export {cognito, userPool}
