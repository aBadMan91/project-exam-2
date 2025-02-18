import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export function VenueCard({ venue }) {
  const imageUrl = venue.media.length > 0 ? venue.media[0].url : null;
  const imageAlt = venue.media.length > 0 ? venue.media[0].alt : "No image available";

  return (
    <Col md={3} className="mb-4">
      <Card>
        {imageUrl && <Card.Img variant="top" src={imageUrl} alt={imageAlt} />}
        <Card.Body>
          <Card.Title>{venue.name}</Card.Title>
          <Card.Text>{venue.description}</Card.Text>
          <Link to={`/venues/${venue.id}`}>
            <Button variant="primary">View Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
