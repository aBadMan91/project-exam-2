import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Logout } from "../../Auth/Logout";
import "./index.scss";

/**
 * Header component renders the navigation bar for the application.
 * It includes links for navigation, user profile options, and a logout modal.
 * The component handles menu toggling, logout modal visibility, and updates based on local storage changes.
 *
 * @returns {JSX.Element} The rendered header with navigation and user options.
 */
export function Header() {
  const [profile, setProfile] = useLocalStorage("profile", null);
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedProfile = localStorage.getItem("profile");
      setProfile(updatedProfile ? JSON.parse(updatedProfile) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setProfile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const openLogoutModal = () => setShowLogout(true);
  const closeLogoutModal = () => setShowLogout(false);

  return (
    <header className="sticky-top">
      <Navbar expanded={menuOpen} onToggle={(isExpanded) => setMenuOpen(isExpanded)} expand="sm" className="mb-2" ref={menuRef}>
        <Container fluid className="my-3">
          <Navbar.Brand as={Link} to="/">
            Holidaze
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
          <Navbar.Collapse id="basic-navbar-nav" className="custom-navbar-collapse justify-content-end">
            <Nav>
              {profile ? (
                <>
                  <Nav.Link as={Link} to={`/profile/${profile.name}`}>
                    {profile.name || "Profile"}
                  </Nav.Link>
                  {profile.venueManager && (
                    <Nav.Link as={Link} to="/create-venue">
                      Create a Venue
                    </Nav.Link>
                  )}
                  <Nav.Link onClick={openLogoutModal}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Logout show={showLogout} onClose={closeLogoutModal} />
    </header>
  );
}
