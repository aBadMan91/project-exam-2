import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { Link } from "react-router-dom";
import { Container, Col, Row, Spinner, Alert, Image, Button } from "react-bootstrap";
import { Logout } from "../../components/Auth/Logout";

export function ProfilePage() {
  const { name } = useParams();
  const token = localStorage.getItem("token");
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const { data: profile, isLoading, isError } = useAuthFetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, token);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (profile) {
      document.title = "Holidaze | " + profile.name;
    }
  }, [profile]);

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error fetching profile. Please try again later.</Alert>
      </Container>
    );
  }

  const openLogoutModal = () => setShowLogout(true);
  const closeLogoutModal = () => setShowLogout(false);

  const isOwnProfile = storedProfile?.name === name;

  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <Image src={profile.avatar.url} alt={profile.avatar.alt} fluid />
        </Col>
      </Row>
      <Row className="mt-3 mb-5">
        <Col xs={12} className="text-center">
          {profile.name}
        </Col>
        <Col xs={12} className="text-center">
          {profile.email}
        </Col>
        {profile.venueManager && (
          <Col xs={12} className="text-center">
            Venue Manager
          </Col>
        )}
      </Row>
      {isOwnProfile && (
        <>
          <Row className="mt-2">
            <Col>
              <Button as={Link} to={`/profile/${profile.name}/bookings`} className="text-start w-100 d-flex justify-content-between align-items-center">
                <span>Your Bookings</span>
                <span>&gt;</span>
              </Button>
            </Col>
          </Row>
          {profile.venueManager && (
            <Row className="mt-2">
              <Col>
                <Button as={Link} to={`/profile/${profile.name}/venues`} className="text-start w-100 d-flex justify-content-between align-items-center">
                  <span>Your Venues</span>
                  <span>&gt;</span>
                </Button>
              </Col>
            </Row>
          )}
          <Row className="mt-2">
            <Col>
              <Button as={Link} to={`/profile/${profile.name}/edit`} className="text-start w-100 d-flex justify-content-between align-items-center">
                <span>Edit Profile</span>
                <span>&gt;</span>
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Button onClick={openLogoutModal} className="text-start w-100 d-flex justify-content-between align-items-center" variant="danger">
                <span>Logout</span>
                <span>&gt;</span>
              </Button>
            </Col>
          </Row>
          <Logout show={showLogout} onClose={closeLogoutModal} />
        </>
      )}
    </Container>
  );
}
