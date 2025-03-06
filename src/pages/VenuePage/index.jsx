import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Container, Row, Col, Spinner, Alert, Carousel } from "react-bootstrap";
import { VenueCarousel } from "../../components/Carousel";

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
        <Col xs={12}>
          <h1>{venue.name}</h1>
        </Col>
        <Col xs={12}>
          <VenueCarousel media={venue.media} />
        </Col>
      </Row>
    </Container>
  );
}
