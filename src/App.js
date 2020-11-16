import React, { useState, useEffect } from "react";
import Amplify, { Hub } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./auth/protected-route"; // wraps Route withAuthenticator

import {
  PrayerCard,
  AddressForm,
  MobileTextForm,
  ThankYou,
  Donations,
  Checkout
} from "./components";
import Profile from "./components/Profile";

// import amplify settings & helpers
import awsconfig from "./aws-exports";
import { getUser } from "./amplifyHelpers";
// load settings
Amplify.configure(awsconfig);


function App() {
  const [state, setState] = useState({});
  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          break;
        case "cognitoHostedUI":
          getUser().then((userData) => {
            setState({ ...state, ...userData });
          });
          break;
        case "signOut":
          setState(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
        default:
          break;
      }
    });
    getUser().then((userData) => {
      setState({ ...state, ...userData });
    });
  }, []); // eslint-disable-line

  return (
    <div className="App">
      {state?.username ? <AmplifySignOut /> : ""}
      <header className="App-header">
        <img src="/crest.png" className="App-logo" alt="logo" />
      </header>
      <Switch>
        <ProtectedRoute path="/where" component={AddressForm} exact={true} />
        <ProtectedRoute
          path="/mobile"
          component={MobileTextForm}
          exact={true}
        />
        <ProtectedRoute path="/thankyou" component={ThankYou} exact={true} />
        <ProtectedRoute path="/donate" component={Donations} exact={true} />
        <ProtectedRoute
          path="/checkout"
          component={() => (
            <Checkout open={true} close={() => console.log("todo")} />
          )}
          exact={true}
        />
        <ProtectedRoute path="/profile" component={Profile} exact={true} />
        <Route path="/" component={PrayerCard} exact={true} />
      </Switch>
      <div className="footerSpace" />
    </div>
  );
}

export default App;
