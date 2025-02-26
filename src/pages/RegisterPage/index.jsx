import React, { useEffect } from "react";
import { RegisterForm } from "../../components/Form/RegisterForm";
import Container from "react-bootstrap/Container";

export function RegisterPage() {
  useEffect(() => {
    document.title = "Holidaze | Register";
  }, []);

  return (
    <Container className="mt-5">
      <h1>Register</h1>
      <p>Please register with your “stud.noroff.no” email.</p>
      <RegisterForm />
    </Container>
  );
}
