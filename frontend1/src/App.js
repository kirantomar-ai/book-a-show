// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import LoginModal from "./components/LoginModal";
import MovieDetailsPage from "./pages/MovieDetails";
import SelectSeatsPage from "./pages/SelectSeatsPage";
import BookShowPage from "./pages/BookShowPage";
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <LoginModal />
    <SubNavbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/book/:movieId" element={<BookShowPage />} />
        <Route path="/book/:movieId/show/:showId" element={<SelectSeatsPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
