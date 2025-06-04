// src/pages/SelectSeatsPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function SelectSeatsPage() {
  const { movieId, showId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/shows/${showId}/seats`);
        setSeats(res.data);
      } catch (err) {
        console.error("Error fetching seats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [showId]);

  const handleSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBook = async () => {
    if (!user) return alert("Please login first.");
    if (selectedSeats.length === 0) return alert("Select at least one seat.");

    try {
      await apiClient.post("/bookings", {
        user_id: user.id,
        show_id: showId,
        seats: selectedSeats,
      });
      alert("Booking successful!");
      navigate("/my-bookings");
    } catch (err) {
      alert("Booking failed. Try again.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>Select Your Seats</Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={1}>
          {seats.map((seat) => (
            <Grid item key={seat.id}>
              <Chip
                label={seat.seat_number}
                color={seat.is_booked ? "default" : selectedSeats.includes(seat.id) ? "success" : "primary"}
                variant={seat.is_booked ? "outlined" : "filled"}
                onClick={() => !seat.is_booked && handleSelect(seat.id)}
                disabled={seat.is_booked}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={handleBook}
          disabled={selectedSeats.length === 0}
          sx={{ textTransform: "none" }}
        >
          Book {selectedSeats.length} Seat(s)
        </Button>
      </Box>
    </Box>
  );
}
