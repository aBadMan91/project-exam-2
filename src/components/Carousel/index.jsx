import React, { useState } from "react";
import { Carousel, Alert, Container, Row, Col, Image } from "react-bootstrap";
import styles from "./index.module.scss";

/**
 * VenueCarousel component displays a carousel of media items for a venue,
 * with thumbnails for navigation and an alert if no media is available.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.media - An array of media objects for the venue.
 * @param {string} props.media[].url - The URL of the media image.
 * @param {string} [props.media[].alt] - The alt text for the media image (optional).
 *
 * @returns {JSX.Element} The rendered carousel with media items or an alert if no media is provided.
 */
export function VenueCarousel({ media }) {
  const [index, setIndex] = useState(0);

  if (!media || media.length === 0) {
    return (
      <Container className="text-center mt-3">
        <Alert variant="warning">No images available for this venue</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Carousel activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)} interval={null} indicators={false}>
        {media.map((mediaItem, idx) => (
          <Carousel.Item key={idx}>
            <Image src={mediaItem.url} alt={mediaItem.alt || "Venue image"} className={`d-block w-100 img-fluid ${styles["carousel-img"]}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Row className="mt-3 justify-content-center">
        {media.map((mediaItem, idx) => (
          <Col xs={3} sm={2} md={1} key={idx} className="px-1">
            <Image src={mediaItem.url} alt={mediaItem.alt || "Venue thumbnail"} className={`img-fluid ${styles["thumbnail-img"]} ${index === idx ? "border border-primary" : ""}`} onClick={() => setIndex(idx)} style={{ cursor: "pointer" }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
