import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { Container, Col, Row, Spinner, Alert, Button, Form } from "react-bootstrap";

export function ProfileEdit() {
  const { name } = useParams();
  const token = localStorage.getItem("token");
  const { data: profile, isLoading, isError, putData } = useAuthFetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, token);
  const [venueManager, setVenueManager] = useState(false);

  useEffect(() => {
    if (profile) {
      document.title = "Holidaze | " + profile.name + " Bookings";
      setVenueManager(profile.venueManager);
    }
  }, [profile]);

  const handleVenueManagerChange = (e) => {
    setVenueManager(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      venueManager: venueManager,
    };

    try {
      await putData(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, updatedProfile);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again later.");
    }
  };

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

  return (
    <Container className="mt-5">
      <Row>
        <h1>Edit Profile</h1>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={profile.name} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={profile.email} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAvatar">
            <Form.Label>Avatar:</Form.Label>
            <Form.Control type="text" defaultValue={profile.avatar.url} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formVenueManager">
            <Form.Check type="checkbox" label="Venue Manager" checked={venueManager} onChange={handleVenueManagerChange} />
          </Form.Group>

          <Button variant="success" type="submit">
            Update profile
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuthFetch } from "../../hooks/useAuthFetch";
// import { Container, Col, Row, Spinner, Alert, Button, Form } from "react-bootstrap";

// export function ProfileEdit() {
//   const { name } = useParams();
//   const token = localStorage.getItem("token");
//   const { data: profile, isLoading, isError } = useAuthFetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, token);
//   const [venueManager, setVenueManager] = useState(false);

//   useEffect(() => {
//     if (profile) {
//       document.title = "Holidaze | " + profile.name + " Bookings";
//       setVenueManager(profile.venueManager);
//     }
//   }, [profile]);

//   const handleVenueManagerChange = (e) => {
//     setVenueManager(e.target.checked);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedProfile = {
//       ...profile,
//       venueManager: venueManager,
//     };

//     try {
//       const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
//         },
//         body: JSON.stringify(updatedProfile),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update profile");
//       }

//       alert("Profile updated successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Error updating profile. Please try again later.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   if (isError) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">Error fetching profile. Please try again later.</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <Row>
//         <h1>Edit Profile</h1>
//       </Row>
//       <Row>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formName">
//             <Form.Label>Name:</Form.Label>
//             <Form.Control type="text" value={profile.name} disabled />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formEmail">
//             <Form.Label>Email:</Form.Label>
//             <Form.Control type="email" value={profile.email} disabled />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formAvatar">
//             <Form.Label>Avatar:</Form.Label>
//             <Form.Control type="text" defaultValue={profile.avatar} />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formVenueManager">
//             <Form.Check type="checkbox" label="Venue Manager" checked={venueManager} onChange={handleVenueManagerChange} />
//           </Form.Group>

//           <Button variant="success" type="submit">
//             Update profile
//           </Button>
//         </Form>
//       </Row>
//     </Container>
//   );
// }
