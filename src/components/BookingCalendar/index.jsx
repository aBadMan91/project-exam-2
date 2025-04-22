import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./BookingCalendar.module.scss";
import { Card, Form, Button } from "react-bootstrap";
import { useCreateData } from "../../hooks/useCreateData";

export function BookingCalendar({ venueId, bookings = [] }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const { postData } = useCreateData(token);

  const getBookedDates = () => {
    const dates = [];
    bookings.forEach(({ dateFrom, dateTo }) => {
      const from = new Date(dateFrom);
      const to = new Date(dateTo);
      for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d).toDateString());
      }
    });
    return dates;
  };

  const bookedDates = getBookedDates();

  const tileDisabled = ({ date }) => {
    return bookedDates.includes(date.toDateString());
  };

  const handleBookNow = async () => {
    if (!checkInDate || !checkOutDate) return;

    setLoading(true);
    try {
      const bookingData = {
        dateFrom: checkInDate.toISOString(),
        dateTo: checkOutDate.toISOString(),
        guests,
        venueId,
      };

      const createdBooking = await postData("https://v2.api.noroff.dev/holidaze/bookings", bookingData);
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
          onChange={(dates) => {
            if (Array.isArray(dates)) {
              setCheckInDate(dates[0]);
              setCheckOutDate(dates[1]);
            }
          }}
          tileDisabled={tileDisabled}
          minDate={new Date()}
          className={styles.calendar}
        />

        <Form.Group controlId="guests" className="mt-4">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} min={1} />
        </Form.Group>

        <Button variant="primary" className="mt-3 w-100" onClick={handleBookNow} disabled={!checkInDate || !checkOutDate || guests < 1}>
          {loading ? "Booking..." : "Book Now"}
        </Button>
      </Card.Body>
    </Card>
  );
}
