import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/";
import { VenuePage } from "./pages/VenuePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { Logout } from "./components/Auth/Logout";
import { ProfilePage } from "./pages/ProfilePage";
import { ProfileBookings } from "./pages/ProfileBookings";
import { ProfileVenues } from "./pages/ProfileVenues";
import { ProfileEdit } from "./pages/ProfileEdit";
import { CreateVenue } from "./pages/CreateVenue";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsPage } from "./pages/SearchResultsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="venues/:id" element={<VenuePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<Logout />} />
        <Route path="profile/:name" element={<ProfilePage />} />
        <Route path="profile/:name/bookings" element={<ProfileBookings />} />
        <Route path="profile/:name/venues" element={<ProfileVenues />} />
        <Route path="profile/:name/edit" element={<ProfileEdit />} />
        <Route path="create-venue" element={<CreateVenue />} />
        <Route path="/" element={<SearchBar />} />
        <Route path="/venues" element={<SearchResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
