import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import styles from "../CardStyles.module.scss";

/**
 * VenueCard component displays a card with details about a specific venue.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue object containing details about the venue.
 * @param {string} props.venue.id - The unique id for the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {Array} props.venue.media - An array of media objects for the venue.
 * @param {Object} [props.venue.media[0]] - The first media object (if available).
 * @param {string} props.venue.media[0].url - The URL of the media image.
 * @param {string} props.venue.media[0].alt - The alt text for the media image.
 * @param {Object} props.venue.location - The location object of the venue.
 * @param {string} props.venue.location.city - The city where the venue is located.
 * @param {string} props.venue.location.country - The country where the venue is located.
 * @param {number} props.venue.price - The price per night for the venue.
 *
 * @returns {JSX.Element|null} The rendered card with venue details, or `null` if no image is available.
 */
export function VenueCard({ venue }) {
  const imageUrl = venue.media.length > 0 ? venue.media[0].url : null;
  if (!imageUrl) {
    return null;
  }
  const imageAlt = venue.media.length > 0 ? venue.media[0].alt : "No image available";
  const location = venue.location ? `${venue.location.city}, ${venue.location.country}` : "Location not available";
  const price = venue.price ? `$${venue.price.toFixed(2)}` : "Price not available";

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card className={styles.card}>
        <Link to={`/venues/${venue.id}`} className={styles["card-link"]}>
          {imageUrl && <Card.Img variant="top" src={imageUrl} alt={imageAlt} className={styles["card-img-top"]} />}
          <Card.Body className={styles["card-body"]}>
            <Card.Title>{venue.name}</Card.Title>
            <Card.Text>Location: {location}</Card.Text>
            <Card.Text>Price: {price},- per night</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}
