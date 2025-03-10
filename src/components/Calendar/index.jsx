import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

export function Calendar() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleCheckInChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const today = new Date().toISOString().split("T")[0];

  const handleBookNow = () => {
    console.log("Booking for:", checkInDate, checkOutDate);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group controlId="check-in">
              <Form.Label>Check-In Date</Form.Label>
              <Form.Control type="date" value={checkInDate} onChange={handleCheckInChange} placeholder="Select check-in date" min={today} />
            </Form.Group>
            <Form.Group controlId="check-out" className="mt-3">
              <Form.Label>Check-Out Date</Form.Label>
              <Form.Control type="date" value={checkOutDate} onChange={handleCheckOutChange} placeholder="Select check-out date" min={checkInDate || today} />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleBookNow} disabled={!checkInDate || !checkOutDate}>
              Book Now
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
