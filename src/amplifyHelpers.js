import { Auth } from "aws-amplify";


async function getUser() {
  try {
    const userData = await Auth.currentAuthenticatedUser();
    const { attributes, username } = userData;
    const {
      email,
      phone_number,
      email_verified,
      phone_number_verified,
      sub
    } = attributes;
    return {
      username, email, phone_number,
      email_verified, phone_number_verified, sub
    }
  } catch {
    return null
  }
}

async function signUp() {
  let username, password, email;
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email // optional
        // phone_number,   // optional - E.164 number convention
        // other custom attributes
      }
    });
    console.log(user);
    // store the user info
  } catch (error) {
    console.log("error signing up:", error);
  }
}

async function confirmSignUp() {
  let username, code;
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}

async function signIn({ username, password }) {
  try {
    const user = await Auth.signIn(username, password);
    console.log("user", user);
  } catch (error) {
    console.log("error signing in", error);
  }
}

async function resendConfirmationCode({ username }) {
  try {
    await Auth.resendSignUp(username);
    console.log("code resent successfully");
  } catch (err) {
    console.log("error resending code: ", err);
  }
}

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

const unchecked = [
  "addr2",
  "email_verified",
  "username",
  "phone_number",
  "phone_number_verified",
  "sub"
];
const checked = [
    "fullname",
    "country",
    "addr1",
    "addr2",
    "city",
    "zip",
    "state",
    "email",
    "username",
    "phone_number",
    "email_verified",
    "phone_number_verified",
    "sub"
];
export { checked, unchecked, getUser, signIn, signOut, signUp, confirmSignUp, resendConfirmationCode };
