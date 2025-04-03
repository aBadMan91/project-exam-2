import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import styles from "../CardStyles.module.scss";

export function VenueCardProfile({ venue }) {
  const imageUrl = venue.media.length > 0 ? venue.media[0].url : null;
  const imageAlt = venue.media.length > 0 ? venue.media[0].alt : "No image available";
  const location = venue.location ? `${venue.location.city}, ${venue.location.country}` : "Location not available";
  const price = venue.price ? `$${venue.price.toFixed(2)}` : "Price not available";

  return (
    <Col xs={12} sm={12} md={6} lg={4} className="mb-4">
      <Card className={styles.card}>
        {imageUrl && <Card.Img variant="top" src={imageUrl} alt={imageAlt} className={styles["card-img-top"]} />}
        <Card.Body className={styles["card-body"]}>
          <Card.Title>{venue.name}</Card.Title>
          <Card.Text>Location: {location}</Card.Text>
          <Card.Text>Price: {price},- per night</Card.Text>
          <Card.Text>Bookings: {venue._count?.bookings ? venue._count.bookings : "No bookings yet"}</Card.Text>
          <Col className="d-flex justify-content-between">
            <Link to={`/venues/${venue.id}`}>
              <Button variant="primary">View Details</Button>
            </Link>
            <Link to={`/venue-bookings/${venue.id}`}>
              <Button variant="primary">View Bookings</Button>
            </Link>
            <Link to={`/edit-venue/${venue.id}`}>
              <Button variant="success">Edit Venue</Button>
            </Link>
          </Col>
        </Card.Body>
      </Card>
    </Col>
  );
}
