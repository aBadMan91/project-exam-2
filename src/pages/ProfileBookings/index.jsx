import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { VenueCardProfile } from "../../components/Cards/VenueCardProfile";
import { Container, Col, Row, Spinner, Alert } from "react-bootstrap";

export function ProfileBookings() {
  const { name } = useParams();
  const token = localStorage.getItem("token");
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const { data: profileBookings, isLoading, isError } = useAuthFetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}/bookings`, token);

  useEffect(() => {
    if (storedProfile) {
      document.title = "Holidaze | " + storedProfile.name + " Bookings";
    }
  }, [storedProfile]);

  console.log(profileBookings);
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
        <Alert variant="danger">Error fetching bookings. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <h1>Your Bookings</h1>
      </Row>
      <Row>
        {profileBookings.length > 0 ? (
          profileBookings.map((venue) => <VenueCardProfile key={venue.id} venue={venue} />)
        ) : (
          <Col>
            <Alert variant="info">No bookings available.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}
