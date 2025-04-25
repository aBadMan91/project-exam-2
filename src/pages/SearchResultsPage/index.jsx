import React from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import { VenueCard } from "../../components/Cards/VenueCard";
import { SearchBar } from "../../components/SearchBar";

/**
 * SearchResultsPage displays venues matching the user's search query.
 *
 * @returns {JSX.Element} The rendered Search Results page.
 */
export function SearchResultsPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const { data: venues } = useFetch("https://v2.api.noroff.dev/holidaze/venues");
  const searchResults = venues?.filter((venue) => venue.name.toLowerCase().includes(query.toLowerCase())) || [];

  return (
    <Container className="mt-5">
      <SearchBar className="mb-2" />
      <h1>Search Results for "{query}"</h1>
      {searchResults.length > 0 ? (
        <Row>
          {searchResults.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </Row>
      ) : (
        <p>No results found</p>
      )}
    </Container>
  );
}
