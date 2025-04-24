import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./index.module.scss";

export function HomePageCarousel({ slides }) {
  if (!slides || slides.length === 0) {
    return (
      <Container className="text-center mt-3">
        <p>No slides available</p>
      </Container>
    );
  }

  return (
    <Carousel interval={3000} indicators={false} controls={false} className="mb-4 mt-4">
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <img src={slide.url} alt={slide.alt || `Slide ${idx + 1}`} className={`d-block w-100 img-fluid ${styles["carousel-img"]}`} />
          {slide.caption && (
            <Carousel.Caption className={styles["carousel-caption"]}>
              <h3>{slide.caption.title}</h3>
              <p>{slide.caption.text}</p>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
