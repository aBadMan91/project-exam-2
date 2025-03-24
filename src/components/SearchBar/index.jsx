import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Container, Form, ListGroup, InputGroup, Button, Row, Col } from "react-bootstrap";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data: venues } = useFetch("https://v2.api.noroff.dev/holidaze/venues?sort=created");
  const navigate = useNavigate();

  useEffect(() => {
    if (venues) {
      const results = venues.filter((venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(results);
    }
  }, [searchQuery, venues]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleVenueClick = (venueId) => {
    setSearchQuery("");
    navigate(`/venues/${venueId}`);
  };

  const handleButtonClick = () => {
    if (searchQuery) {
      navigate(`/venues?query=${searchQuery}`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleButtonClick();
  };

  return (
    <Container className="mb-2">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="searchBar">
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <InputGroup>
                <Form.Control type="text" placeholder="Search for venues" value={searchQuery} onChange={handleSearch} autoComplete="off" />
                <Button variant="primary" onClick={handleButtonClick}>
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      {searchQuery && searchResults.length > 0 && (
        <ListGroup>
          {searchResults.map((venue) => (
            <ListGroup.Item key={venue.id} onClick={() => handleVenueClick(venue.id)}>
              {venue.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
