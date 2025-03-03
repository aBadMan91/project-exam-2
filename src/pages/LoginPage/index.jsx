import React, { useEffect } from "react";
import { LoginForm } from "../../components/Form/LoginForm";
import Container from "react-bootstrap/Container";

export function LoginPage() {
  useEffect(() => {
    document.title = "Holidaze | Login";
  }, []);

  return (
    <Container className="mt-5">
      <h1>Register</h1>
      <p>Please register with your “stud.noroff.no” email.</p>
      <LoginForm />
    </Container>
  );
}
