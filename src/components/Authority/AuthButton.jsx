import React from "react";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <>
      <LogoutButton /> <NavLink to="/profile">profile</NavLink>
    </>
  ) : (
    <LoginButton />
  );
};

export default AuthButton;
