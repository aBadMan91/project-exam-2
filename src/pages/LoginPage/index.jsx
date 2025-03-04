import React, { useEffect } from "react";
import { Login } from "../../components/Auth/Login";
import Container from "react-bootstrap/Container";

export function LoginPage() {
  useEffect(() => {
    document.title = "Holidaze | Login";
  }, []);

  return (
    <Container className="mt-5">
      <h1>Login</h1>
      <p>Please Login with your “stud.noroff.no” email.</p>
      <Login />
    </Container>
  );
}
