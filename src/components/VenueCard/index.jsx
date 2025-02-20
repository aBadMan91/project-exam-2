import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export function VenueCard({ venue }) {
  const imageUrl = venue.media.length > 0 ? venue.media[0].url : null;
  const imageAlt = venue.media.length > 0 ? venue.media[0].alt : "No image available";
  const location = venue.location ? `${venue.location.city}, ${venue.location.country}` : "Location not available";
  const price = venue.price ? `$${venue.price.toFixed(2)}` : "Price not available";

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card>
        {imageUrl && <Card.Img variant="top" src={imageUrl} alt={imageAlt} />}
        <Card.Body>
          <Card.Title>{venue.name}</Card.Title>
          <Card.Text>Location: {location}</Card.Text>
          <Card.Text>Price: {price},- per night</Card.Text>
          <Link to={`/venues/${venue.id}`}>
            <Button variant="primary">View Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
