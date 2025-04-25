import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { VenueCardProfile } from "../../components/Cards/VenueCardProfile";
import { Container, Col, Row, Spinner, Alert } from "react-bootstrap";

/**
 * ProfileVenues page displays the user's venues.
 * Includes loading and error states.
 *
 * @returns {JSX.Element} The rendered Profile Venues page.
 */
export function ProfileVenues() {
  const { name } = useParams();
  const token = localStorage.getItem("token");
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const { data: profileVenues, isLoading, isError } = useAuthFetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}/venues`, token);

  useEffect(() => {
    if (storedProfile) {
      document.title = "Holidaze | " + storedProfile.name + " Venues";
    }
  }, [storedProfile]);

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
        <Alert variant="danger">Error fetching profileVenues. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <h1>Your Venues</h1>
      </Row>
      <Row>
        {profileVenues.length > 0 ? (
          profileVenues.map((venue) => <VenueCardProfile key={venue.id} venue={venue} />)
        ) : (
          <Col>
            <Alert variant="info">No venues available.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}
