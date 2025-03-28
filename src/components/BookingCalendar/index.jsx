import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useCreateData } from "../../hooks/useCreateData";

export function BookingCalendar({ venueId }) {
  console.log("Received venueId:", venueId);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const { postData } = useCreateData(token);

  const handleCheckInChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleGuestsChange = (event) => {
    setGuests(Number(event.target.value));
  };

  const today = new Date().toISOString().split("T")[0];

  const handleBookNow = async () => {
    setLoading(true);
    try {
      const bookingData = {
        dateFrom: checkInDate,
        dateTo: checkOutDate,
        guests: Number(guests),
        venueId,
      };
      console.log("Booking data:", bookingData);

      const createdBooking = await postData("https://v2.api.noroff.dev/holidaze/bookings", bookingData);
      console.log("Booking created:", createdBooking);

      // Display a success message
      alert("Booking confirmed!");
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Booking failed. Please try again.");
    }
    setLoading(false);
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
            <Form.Group controlId="guests" className="mt-3">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control type="number" value={guests} onChange={handleGuestsChange} placeholder="Enter number of guests" min={1} />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleBookNow} disabled={!checkInDate || !checkOutDate || guests < 1}>
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

// import React, { useState } from "react";
// import { Form, Container, Row, Col, Button } from "react-bootstrap";

// export function Calendar() {
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");

//   const handleCheckInChange = (event) => {
//     setCheckInDate(event.target.value);
//   };

//   const handleCheckOutChange = (event) => {
//     setCheckOutDate(event.target.value);
//   };

//   const today = new Date().toISOString().split("T")[0];

//   const handleBookNow = () => {
//     console.log("Booking for:", checkInDate, checkOutDate);
//   };

//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col md={{ span: 6, offset: 3 }}>
//           <Form>
//             <Form.Group controlId="check-in">
//               <Form.Label>Check-In Date</Form.Label>
//               <Form.Control type="date" value={checkInDate} onChange={handleCheckInChange} placeholder="Select check-in date" min={today} />
//             </Form.Group>
//             <Form.Group controlId="check-out" className="mt-3">
//               <Form.Label>Check-Out Date</Form.Label>
//               <Form.Control type="date" value={checkOutDate} onChange={handleCheckOutChange} placeholder="Select check-out date" min={checkInDate || today} />
//             </Form.Group>
//             <Button variant="primary" className="mt-3" onClick={handleBookNow} disabled={!checkInDate || !checkOutDate}>
//               Book Now
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
