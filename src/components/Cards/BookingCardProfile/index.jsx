import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import styles from "../CardStyles.module.scss";

export function BookingCardProfile({ booking }) {
  const venue = booking.venue;
  const imageUrl = venue.media.length > 0 ? venue.media[0].url : null;
  const imageAlt = venue.media.length > 0 ? venue.media[0].alt : "No image available";
  const location = venue.location ? `${venue.location.city}, ${venue.location.country}` : "Location not available";
  const price = venue.price ? `$${venue.price.toFixed(2)}` : "Price not available";
  const dateFrom = new Date(booking.dateFrom).toLocaleDateString();
  const dateTo = new Date(booking.dateTo).toLocaleDateString();

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card className={styles.card}>
        {imageUrl && <Card.Img variant="top" src={imageUrl} alt={imageAlt} className={styles["card-img-top"]} />}
        <Card.Body className={styles["card-body"]}>
          <Card.Title>{venue.name}</Card.Title>
          <Card.Text>Location: {location}</Card.Text>
          <Card.Text>Price: {price},- per night</Card.Text>
          <Card.Text>Booking Dates from: {dateFrom}</Card.Text>
          <Card.Text>Booking Dates to: {dateTo}</Card.Text>
          <Card.Text>Guests: {booking.guests}</Card.Text>
          <Link to={`/venues/${venue.id}`}>
            <Button variant="primary">View Venue</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
