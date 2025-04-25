import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import styles from "../CardStyles.module.scss";

/**
 * BookingCardProfile component displays a card with booking details for a specific venue.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.booking - The booking object containing details about the booking.
 * @param {Object} props.booking.venue - The venue of the booking.
 * @param {string} props.booking.venue.id - The unique id for the venue.
 * @param {string} props.booking.venue.name - The name of the venue.
 * @param {Array} props.booking.venue.media - An array of media objects for the venue.
 * @param {Object} [props.booking.venue.media[0]] - The first media object (if available).
 * @param {string} props.booking.venue.media[0].url - The URL of the media image.
 * @param {string} props.booking.venue.media[0].alt - The alt text for the media image.
 * @param {Object} props.booking.venue.location - The location object of the venue.
 * @param {string} props.booking.venue.location.city - The city where the venue is located.
 * @param {string} props.booking.venue.location.country - The country where the venue is located.
 * @param {number} props.booking.venue.price - The price per night for the venue.
 * @param {string} props.booking.dateFrom - The start date of the booking.
 * @param {string} props.booking.dateTo - The end date of the booking.
 * @param {number} props.booking.guests - The number of guests for the booking.
 *
 * @returns {JSX.Element} The rendered card with venue details and booking information.
 */
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
        <Link to={`/venues/${venue.id}`} className={styles["card-link"]}>
          {imageUrl && <Card.Img variant="top" src={imageUrl} alt={imageAlt} className={styles["card-img-top"]} />}
          <Card.Body className={styles["card-body"]}>
            <Card.Title>{venue.name}</Card.Title>
            <Card.Text>Location: {location}</Card.Text>
            <Card.Text>Price: {price},- per night</Card.Text>
            <Card.Text>Booking Dates from: {dateFrom}</Card.Text>
            <Card.Text>Booking Dates to: {dateTo}</Card.Text>
            <Card.Text>Guests: {booking.guests}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}
