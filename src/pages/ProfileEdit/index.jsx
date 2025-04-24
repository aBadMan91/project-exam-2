import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { useUpdateData } from "../../hooks/useUpdateData";
import { Container, Row, Spinner, Alert, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  avatar: yup.string().url("Invalid URL format").required("Avatar URL is required"),
  venueManager: yup.boolean(),
});

export function ProfileEdit() {
  const { name } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const { data: profile, isLoading, isError } = useAuthFetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, token);
  const { isError: isUpdateError, putData } = useUpdateData(token);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Redirect to home if the user is trying to edit another user's profile
  useEffect(() => {
    if (storedProfile?.name !== name) {
      navigate("/");
    }
  }, [name, storedProfile, navigate]);

  useEffect(() => {
    if (profile) {
      document.title = `Holidaze | ${profile.name} | Edit Profile`;
      setValue("avatar", profile.avatar.url);
      setValue("venueManager", profile.venueManager);
    }
  }, [profile, setValue]);

  const onSubmit = async (data) => {
    try {
      await putData(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, {
        avatar: { url: data.avatar },
        venueManager: data.venueManager,
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again later.");
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError || isUpdateError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error fetching or updating profile. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <h1>Edit Profile</h1>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={profile.name} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={profile.email} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAvatar">
            <Form.Label>Avatar:</Form.Label>
            <Form.Control type="text" {...register("avatar")} />
            {errors.avatar && <Alert variant="danger">{errors.avatar.message}</Alert>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formVenueManager">
            <Form.Check type="checkbox" label="Venue Manager" {...register("venueManager")} />
          </Form.Group>

          <Button variant="success" type="submit">
            Update profile
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
