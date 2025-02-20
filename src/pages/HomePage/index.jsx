import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { VenueCard } from "../../components/VenueCard";
import { Container, Row, Spinner, Alert } from "react-bootstrap";

export function HomePage() {
  const { data, isLoading, isError } = useFetch("https://v2.api.noroff.dev/holidaze/venues");

  useEffect(() => {
    document.title = "Holidaze | Home";
  }, []);

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
        <Alert variant="danger">Error fetching venues</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>Venues</h1>
      <Row>{data.length > 0 ? data.map((venue) => <VenueCard key={venue.id} venue={venue} />) : <p className="text-center">No venues available</p>}</Row>
    </Container>
  );
}
