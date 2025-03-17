import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { Container, Col, Row, Spinner, Alert } from "react-bootstrap";

export function ProfilePage() {
  const { name } = useParams();
  const token = localStorage.getItem("token");
  const { data: profile, isLoading, isError } = useAuthFetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, token);

  useEffect(() => {
    if (profile) {
      document.title = "Holidaze | " + profile.name;
    }
  }, [profile]);

  console.log(profile);

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error fetching profile. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12}>{profile.name}</Col>
      </Row>
    </Container>
  );
}
