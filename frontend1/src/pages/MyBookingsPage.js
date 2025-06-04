import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Container,
} from "@mui/material";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import MovieIcon from '@mui/icons-material/Movie';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

export default function MyBookingsPage() {
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const res = await apiClient.get(`/bookings/user/${user.id}`);
        if (Array.isArray(res.data)) {
          setBookings(res.data);
        }
      } catch (err) {
        console.error("Failed to load bookings:", err);
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          background: "linear-gradient(to right, #FF512F, #DD2476)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign:'center'
        }}
      >
        🎟️ My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography variant="body1">You haven't made any bookings yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking.booking_id}>
                <Box sx={{width:'100%'}}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                  height: "100%",
                  transition: "transform 0.2s",
                  ":hover": { transform: "scale(1.02)" },
                }}
                onClick={()=>{}}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: "#e91e63" }}>
                    <MovieIcon fontSize="small" sx={{ mr: 1 }} />
                    {booking.movie_title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <TheaterComedyIcon fontSize="small" sx={{ mr: 1 }} />
                    {booking.theatre_name} | Screen {booking.screen_number}
                  </Typography>
                
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    {new Date(booking.show_time).toLocaleString()}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    <EventSeatIcon fontSize="small" sx={{ mr: 1 }} />
                    Seats:
                  </Typography>

                  <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {booking.seat_numbers &&
                      booking.seat_numbers.split(", ").map((s) => (
                        <Chip
                          key={s}
                          label={s}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                  </Box>

                  <Typography mt={2} fontWeight="bold" color="primary">
                    Total Paid: ₹{booking.total_amount}
                  </Typography>
                </CardContent>
              </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
