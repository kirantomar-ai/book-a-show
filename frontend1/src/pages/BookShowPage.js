import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../services/apiClient";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
} from "@mui/material";

export default function BookShowPage() {
  const { movieId } = useParams();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await apiClient.get(`/shows/movie/${movieId}`);
        setShows(res.data);
      } catch (err) {
        console.error("Error fetching shows:", err);
      }
    };
    fetchShows();
  }, [movieId]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        🎟️ Available Shows
      </Typography>

      <Grid container spacing={3}>
        {shows.map((show) => (
          <Grid item xs={12} sm={6} md={4} key={show.id}>
            <Card
              elevation={4}
              sx={{
                height: "100%",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s",
                ":hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {show.theatre_name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {show.address}, {show.city_name}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography variant="body2">
                  🎬 Screen: <strong>{show.screen_number}</strong>
                </Typography>

                <Typography variant="body2">
                  🕒 Time:{" "}
                  <strong>
                    {new Date(show.show_time).toLocaleString()}
                  </strong>
                </Typography>

                <Typography variant="body2">
                  💰 Price: <strong>₹{show.price}</strong>
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  to={`/book/${movieId}/show/${show.id}`}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: "bold",
                    bgcolor: "#1976d2",
                    ":hover": { bgcolor: "#1565c0" },
                  }}
                >
                  Select Seats
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
