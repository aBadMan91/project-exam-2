import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import "./index.scss";

export function Header() {
  const [profile, setProfile] = useLocalStorage("profile", null);
  const [isLoggedIn, setIsLoggedIn] = useState(profile !== null);

  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage change event");
      const updatedProfile = localStorage.getItem("profile");
      setProfile(updatedProfile ? JSON.parse(updatedProfile) : null);
      setIsLoggedIn(updatedProfile !== null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setProfile]);

  return (
    <header className="sticky-top">
      <Navbar expand="sm" className="mb-2">
        <Container fluid className="my-3">
          <Navbar.Brand as={Link} to="/">
            Holidaze
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="custom-navbar-collapse justify-content-end">
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout">
                    Logout
                  </Nav.Link>
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
    </header>
  );
}
