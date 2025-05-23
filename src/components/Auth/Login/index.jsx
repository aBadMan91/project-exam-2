import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .matches(/@stud\.noroff\.no$/, "Must be a @stud.noroff.no email")
    .required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

/**
 * Login component for user authentication.
 *
 * This component uses yup for validation and react-hook-form for form handling.
 * After it sends a successful POST request to the API, it stores the user's profile and token in local storage.
 *
 * @returns {JSX.Element} The rendered login form.
 */
export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [, setProfile] = useLocalStorage("profile", null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login?_holidaze=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();

      setProfile(result.data);

      localStorage.setItem("profile", JSON.stringify(result.data));
      localStorage.setItem("token", result.data.accessToken);

      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
