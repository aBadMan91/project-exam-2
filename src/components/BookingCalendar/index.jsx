import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./BookingCalendar.module.scss";
import { Card, Form, Button } from "react-bootstrap";
import { useCreateData } from "../../hooks/useCreateData";

/**
 * Calculates the total guests for each booked date.
 *
 * @param {Array} bookings - Array of bookings with `dateFrom`, `dateTo`, and `guests`.
 * @returns {Object} Dates mapped to total guests.
 */
function getBookedDatesWithGuests(bookings) {
  const datesWithGuests = {};
  bookings.forEach(({ dateFrom, dateTo, guests }) => {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      const dateString = new Date(d).toDateString();
      datesWithGuests[dateString] = (datesWithGuests[dateString] || 0) + guests;
    }
  });
  return datesWithGuests;
}

/**
 * BookingCalendar component for selecting dates and booking a venue.
 *
 * This component allows users to select check-in and check-out dates.
 * It also displays the number of guests that can be booked for each date.
 *
 * @param {Object} props - Component props.
 * @param {string} props.venueId - Venue ID.
 * @param {Array} [props.bookings=[]] - Existing bookings.
 * @param {number} props.maxGuests - Max guests allowed.
 * @returns {JSX.Element} Booking calendar UI.
 */
export function BookingCalendar({ venueId, bookings = [], maxGuests }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const { postData } = useCreateData(token);

  const bookedDatesWithGuests = useMemo(() => getBookedDatesWithGuests(bookings), [bookings]);

  const isDateFullyBooked = (date) => {
    const dateString = date.toDateString();
    return bookedDatesWithGuests[dateString] >= maxGuests;
  };

  const getRemainingGuests = (date) => {
    const dateString = date.toDateString();
    return maxGuests - (bookedDatesWithGuests[dateString] || 0);
  };

  const handleBookNow = async () => {
    if (!checkInDate || !checkOutDate) return;

    if (guests > maxGuests) {
      alert(`Booking failed. The max number of guests is (${maxGuests}).`);
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        dateFrom: checkInDate.toISOString(),
        dateTo: checkOutDate.toISOString(),
        guests,
        venueId,
      };

      await postData("https://v2.api.noroff.dev/holidaze/bookings", bookingData);
      alert("Booking confirmed!");
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Booking failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Card className={`${styles.cardWrapper} ms-lg-auto mx-auto`}>
      <Card.Body>
        <Card.Title className="text-center mb-4 fs-5">Select Check-In and Check-Out Dates</Card.Title>

        <Calendar
          selectRange
          minDate={new Date()}
          onChange={(dates) => {
            if (Array.isArray(dates)) {
              setCheckInDate(dates[0]);
              setCheckOutDate(dates[1]);
            }
          }}
          tileDisabled={({ date }) => isDateFullyBooked(date)}
          tileContent={({ date }) => {
            const remaining = getRemainingGuests(date);
            return <div style={{ fontSize: "0.75rem", color: remaining > 0 ? "green" : "red" }}>{remaining > 0 ? `${remaining}` : "X"}</div>;
          }}
          className={styles.calendar}
        />

        <Form.Group controlId="guests" className="mt-4">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} min={1} max={maxGuests} />
        </Form.Group>

        <Button variant="primary" className="mt-3 w-100" onClick={handleBookNow} disabled={!checkInDate || !checkOutDate || guests < 1}>
          {loading ? "Booking..." : "Book Now"}
        </Button>
      </Card.Body>
    </Card>
  );
}
