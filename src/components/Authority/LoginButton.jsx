import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Common/Button"
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      className="Button-Blue-half"
      onClick={() => loginWithRedirect()}
      text="Log In"
    >
    </Button>
  );
};

export default LoginButton;