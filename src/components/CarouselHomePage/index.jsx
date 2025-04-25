import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./index.module.scss";

/**
 * HomePageCarousel component displays a carousel of slides for the homepage.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.slides - An array of slide objects to display in the carousel.
 * @param {string} props.slides[].url - The URL of the slide image.
 * @param {string} [props.slides[].alt] - The alt text for the slide image (optional).
 * @param {Object} [props.slides[].caption] - The caption object for the slide (optional).
 * @param {string} props.slides[].caption.title - The title of the caption (optional).
 * @param {string} props.slides[].caption.text - The text of the caption (optional).
 *
 * @returns {JSX.Element} The rendered carousel or a message if no slides are available.
 */
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
