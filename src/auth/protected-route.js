// src/auth/protected-route.js

import React from "react";
import { Route } from "react-router-dom";
// import { withAuthenticationRequired } from "@auth0/auth0-react"; // for Auth0
import { withAuthenticator } from "@aws-amplify/ui-react"; // for Cognito

import { Loading } from "../components/index";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticator(component, {
      onRedirecting: () => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Loading />
          </div>
        </>
      )
    })}
    {...args}
  />
);

export default ProtectedRoute;
