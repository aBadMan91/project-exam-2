import React, { useState } from "react";
import { Carousel, Alert, Container, Row, Col, Image } from "react-bootstrap";
import "./index.scss";

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
            <Image src={mediaItem.url} alt={mediaItem.alt || "Venue image"} className="d-block w-100 img-fluid carousel-img" />
          </Carousel.Item>
        ))}
      </Carousel>
      <Row className="mt-3 justify-content-center">
        {media.map((mediaItem, idx) => (
          <Col xs={3} sm={2} md={1} key={idx} className="px-1">
            <Image src={mediaItem.url} alt={mediaItem.alt || "Venue thumbnail"} className={`img-fluid thumbnail-img ${index === idx ? "border border-primary" : ""}`} onClick={() => setIndex(idx)} style={{ cursor: "pointer" }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// import React from "react";
// import { Carousel, Alert, Container } from "react-bootstrap";

// export function VenueCarousel({ media }) {
//   if (!media || media.length === 0) {
//     return (
//       <Container className="text-center mt-3">
//         <Alert variant="warning">No images available for this venue</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Carousel interval={null} indicators={media.length > 1}>
//       {media.map((mediaItem, index) => (
//         <Carousel.Item key={index}>
//           <img src={mediaItem.url} alt={mediaItem.alt || "Venue image"} className="d-block w-100 img-fluid" />
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }
