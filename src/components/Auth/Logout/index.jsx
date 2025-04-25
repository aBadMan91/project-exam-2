import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Modal, Button } from "react-bootstrap";

/**
 * Logout component renders a modal to confirm the user's logout action.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Determines whether the modal is visible.
 * @param {Function} props.onClose - Callback function to close the modal.
 *
 * @returns {JSX.Element} The Logout confirmation modal.
 */
export function Logout({ show, onClose }) {
  const [, , removeProfile] = useLocalStorage("profile", null);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeProfile();
    onClose();
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>You are about to log out. Continue?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
