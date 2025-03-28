import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { VenueCarousel } from "../../components/Carousel";
import { BookingCalendar } from "../../components/BookingCalendar";

export function VenuePage() {
  const { id } = useParams();
  const { data: venue, isLoading, isError } = useFetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`);

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
          <p>
            {venue.location.city}, {venue.location.country}
          </p>
        </Col>
        <Col xs={12}>
          <VenueCarousel media={venue.media} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={8}>
          <h2>Price: {venue.price},- per night</h2>
          <h3>Rating: {venue.rating}/5</h3>
          <p>Owner: {venue.owner.name}</p>
          <p>
            Wi-Fi: {venue.meta.wifi ? "Yes" : "No"}, Parking: {venue.meta.parking ? "Yes" : "No"}, Breakfast: {venue.meta.breakfast ? "Yes" : "No"}, Pets: {venue.meta.pets ? "Allowed" : "Not Allowed"}
          </p>
          <p>Max capacity: {venue.maxGuests} guests.</p>
          <p>{venue.description}</p>
        </Col>
        <Col xs={12} lg={4}>
          <BookingCalendar venueId={venue.id} />
        </Col>
      </Row>
    </Container>
  );
}
