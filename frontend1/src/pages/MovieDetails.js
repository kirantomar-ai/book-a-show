// src/pages/MovieDetailsPage.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Grid,
  Button,
  Container,
} from "@mui/material";
import { tmdbClient } from "../services/apiClient";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    // Fetch movie details and credits (cast & crew)
    tmdbClient.get(`/movie/${id}`).then((res) => setMovie(res.data));
    tmdbClient.get(`/movie/${id}/credits`).then((res) => setCredits(res.data));
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  const castList = credits?.cast?.slice(0, 5).map((c) => c.name) || [];
  const crewList = credits?.crew
    ?.filter((c) => ["Director", "Producer"].includes(c.job))
    .slice(0, 5)
    .map((c) => c.name) || [];

  return (
    <Container maxWidth='lg' sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Poster */}
        <Grid item xs={12} md={3}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            {movie.original_language.toUpperCase()} | {movie.genres.map(g => g.name).join(", ")}
          </Typography>

          <Typography variant="body1" gutterBottom>
            {movie.runtime} min • {movie.release_date}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Chip label={`⭐ ${movie.vote_average}`} color="primary" />
            <Typography variant="body2" sx={{ ml: 2 }}>
              {movie.vote_count} votes
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            About the movie
          </Typography>
          <Typography variant="body1" gutterBottom>
            {movie.overview}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          <Typography variant="body1" gutterBottom>
            {castList.join(", ")}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Crew
          </Typography>
          <Typography variant="body1" gutterBottom>
            {crewList.join(", ")}
          </Typography>

          <Button variant="contained" sx={{ mt: 3, padding: '10px', paddingX: '30px', borderRadius: '10px', backgroundColor: 'red' }} component={Link}
            to={`/book/${movie.id}`} >
            Book Tickets
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
