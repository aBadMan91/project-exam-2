import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { VenueCard } from "../../components/Cards/VenueCard";
import { SearchBar } from "../../components/SearchBar";
import { Container, Row, Spinner, Alert, Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export function HomePage() {
  const { data, isLoading, isError } = useFetch("https://v2.api.noroff.dev/holidaze/venues?_owner=true&_bookings=true&sort=created");
  const [searchParams, setSearchParams] = useSearchParams();

  const venuesPerPage = 20;
  const totalPages = Math.ceil(data.length / venuesPerPage);
  const currentPage = Number(searchParams.get("page")) || 1;

  const currentVenues = data.slice((currentPage - 1) * venuesPerPage, currentPage * venuesPerPage);

  useEffect(() => {
    document.title = `Holidaze | Home | Page ${currentPage}`;
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setSearchParams({ page: pageNumber });
      // window.scrollTo(0, 0);
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
