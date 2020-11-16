import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_UKTRNvhKl",
  ClientId: "49k1otk0hoaj27kpql336b4ufa"
}

export default new CognitoUserPool(poolData);
