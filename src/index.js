import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import * as serviceWorker from "./serviceWorker";
// import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { createBrowserHistory } from "history";
// import Amplify, { Auth } from 'aws-amplify';
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    {/* <Auth0ProviderWithHistory> */}
      <RecoilRoot>
        <App />
      </RecoilRoot>
    {/* </Auth0ProviderWithHistory> */}
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
