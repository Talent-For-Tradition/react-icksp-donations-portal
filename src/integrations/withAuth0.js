import React, { useEffect, useState } from 'react';
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { Route } from "react-router-dom";

// not sure if this is necessary.

export const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);
// https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#4-create-a-useapi-hook-for-accessing-protected-apis-with-an-access-token
export const useApi = (url, options = {}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { audience, scope, ...fetchOptions } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });
        const res = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setState({
          ...state,
          data: await res.json(),
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
  }, [refreshIndex]);//eslint-disable-line

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};

// https://auth0.com/docs/flows/add-login-using-the-authorization-code-flow-with-pkce#create-code-challenge

function base64URLEncode(str) {
  // Dependency: Node.js crypto module
  // https://nodejs.org/api/crypto.html#crypto_crypto
  return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}

export function createVerifier() {
  return base64URLEncode(crypto.randomBytes(32));
}

function sha256(buffer) {
  // Dependency: Node.js crypto module
  // https://nodejs.org/api/crypto.html#crypto_crypto
  return crypto.createHash('sha256').update(buffer).digest();
}

export function createChallenge(verifier) {
  return base64URLEncode(sha256(verifier));
}


/**
    https://threaded.us.auth0.com/authorize?
    response_type=code&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    client_id=YOUR_CLIENT_ID&
    redirect_uri=YOUR_CALLBACK_URL&
    scope=SCOPE&
    state=STATE
 */