import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/slices/movieSlice';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

export default function HomePage() {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' sx={{margin:'20px',textAlign:'center'}}>Now Playing</Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ width: 200 }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: 8 }}
                />
                <h4>{movie.title}</h4>
                <p>⭐ {movie.vote_average}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
