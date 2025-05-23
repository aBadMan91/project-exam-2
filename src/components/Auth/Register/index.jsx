import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().min(3).max(10).required("Name must be at least 3 characters"),
  email: yup
    .string()
    .email("Email is invalid")
    .matches(/@stud\.noroff\.no$/, "Must be a @stud.noroff.no email")
    .required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  venueManager: yup.boolean(),
});

/**
 * Register component renders a registration form for new users.
 * The form includes fields for name, email, password, and an optional venue manager checkbox.
 * It validates input using Yup and react-hook-form, and submits the data to the API.
 * On successful registration, the user is redirected to the login page.
 *
 * @returns {JSX.Element} The rendered registration form.
 */
export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" {...register("name")} isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" {...register("email")} isInvalid={!!errors.email} />
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" {...register("password")} isInvalid={!!errors.password} />
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formVenueManager">
        <Form.Check type="checkbox" label="Venue Manager" {...register("venueManager")} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}
