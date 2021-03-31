import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_9sP4CUJwB",
  ClientId: "4lopeqiaq0bmrmvkccb09u6lq8"
}

export default new CognitoUserPool(poolData);
