import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { VenueCard } from "../../components/Cards/VenueCard";
import { SearchBar } from "../../components/SearchBar";
import { HomePageCarousel } from "../../components/CarouselHomePage";
import { Container, Row, Spinner, Alert, Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

/**
 * HomePage displays a list of venues, a search bar, and a carousel with featured slides.
 * Includes pagination for navigating through venues.
 *
 * @returns {JSX.Element} The rendered Home Page.
 */
export function HomePage() {
  const { data, isLoading, isError } = useFetch("https://v2.api.noroff.dev/holidaze/venues?_owner=true&_bookings=true&sort=created");
  const [searchParams, setSearchParams] = useSearchParams();

  const venuesPerPage = 20;

  const validVenues = data.filter((venue) => venue.name.length <= 50 && venue.media.length > 0);

  const totalPages = Math.ceil(validVenues.length / venuesPerPage);
  const currentPage = Number(searchParams.get("page")) || 1;

  const currentVenues = validVenues.slice((currentPage - 1) * venuesPerPage, currentPage * venuesPerPage);

  const homePageSlides = [
    {
      url: "https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg",
      alt: "First slide",
      caption: { title: "Welcome to Holidaze", text: "Find the best venues for your next adventure." },
    },
    {
      url: "https://images.pexels.com/photos/31748642/pexels-photo-31748642/free-photo-of-charming-stone-street-in-historic-european-village.jpeg",
      alt: "Second slide",
      caption: { title: "Explore Our Venues", text: "Discover amazing places to stay." },
    },
    {
      url: "https://images.pexels.com/photos/17824132/pexels-photo-17824132/free-photo-of-hill-in-the-hobbiton-movie-set.jpeg",
      alt: "Third slide",
      caption: { title: "Book Your Stay", text: "Easy and convenient booking process." },
    },
  ];

  useEffect(() => {
    document.title = `Holidaze | Home | Page ${currentPage}`;
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setSearchParams({ page: pageNumber });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error fetching venues</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <HomePageCarousel slides={homePageSlides} />
      <SearchBar />
      <h1>Venues</h1>
      <Row>{currentVenues.length > 0 ? currentVenues.map((venue) => <VenueCard key={venue.id} venue={venue} />) : <p className="text-center">No venues available</p>}</Row>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </Container>
  );
}
