import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Modal, Button } from "react-bootstrap";

export function Logout() {
  const [, , removeProfile] = useLocalStorage("profile", null);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleLogout = () => {
    removeProfile();
    setShow(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
