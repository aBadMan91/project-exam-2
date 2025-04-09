import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Container, Row, Col, Spinner, Alert, Button, Card } from "react-bootstrap";
import { VenueCarousel } from "../../components/Carousel";
import { BookingCalendar } from "../../components/BookingCalendar";

export function VenueBookings() {
  const { id } = useParams();
  const { data: venue, isLoading, isError } = useFetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true&_owner=true`);
  const [profile] = useLocalStorage("profile", null);

  console.log(venue);

  useEffect(() => {
    if (venue) {
      document.title = "Holidaze | " + venue.name + " | Bookings";
    }
  }, [venue]);

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
      <Row className="my-4">
        <h1>Bookings for {venue.name}</h1>
        <Col xs={12}>
          <p>
            {venue.location.city}, {venue.location.country}
          </p>
        </Col>
        <Col xs={12}>
          <Link to={`/venues/${venue.id}`}>
            <Button variant="primary" className="me-2">
              View Details
            </Button>
          </Link>
          <Link to={`/edit-venue/${venue.id}`}>
            <Button variant="success">Edit Venue</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Upcoming Bookings: {venue._count.bookings}</p>
        </Col>
      </Row>
      <Row>
        {venue.bookings.map((booking) => (
          <Col key={booking.id} xs={12} className="mb-3">
            <Card className="p-3">
              <Card.Body>
                <Card.Title>Booking ID: {booking.id}</Card.Title>
                <Card.Text>
                  <strong>Customer:</strong> {booking.customer.name} ({booking.customer.email})
                </Card.Text>
                <Card.Text>
                  <strong>Booking Dates:</strong> {new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                  <strong>Guests:</strong> {booking.guests}
                </Card.Text>
                <Card.Text>
                  <strong>Created:</strong> {new Date(booking.created).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
