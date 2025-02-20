import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Container, Row, Spinner, Alert } from "react-bootstrap";

export function VenuePage() {
  const { id } = useParams();
  const { data: venue, isLoading, isError } = useFetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);

  useEffect(() => {
    if (venue) {
      document.title = "Holidaze | " + venue.name;
    }
  }, [venue]);

  console.log(venue);

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
        <Alert variant="danger">Error fetching venue</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <h1>{venue.name}</h1>
      </Row>
    </Container>
  );
}
