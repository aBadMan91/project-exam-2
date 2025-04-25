import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { BookingCardProfile } from "../../components/Cards/BookingCardProfile";
import { Container, Col, Row, Spinner, Alert } from "react-bootstrap";

/**
 * ProfileBookings page displays the user's bookings with venues.
 * Includes loading and error states.
 *
 * @returns {JSX.Element} The rendered Profile Bookings page.
 */
export function ProfileBookings() {
  const { name } = useParams();
  const token = localStorage.getItem("token");
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const { data: profileBookings, isLoading, isError } = useAuthFetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}/bookings?_customer=true&_venue=true`, token);

  useEffect(() => {
    if (storedProfile) {
      document.title = "Holidaze | " + storedProfile.name + " Bookings";
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
          profileBookings.map((booking) => <BookingCardProfile key={booking.id} booking={booking} />)
        ) : (
          <Col>
            <Alert variant="info">No bookings available.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}
