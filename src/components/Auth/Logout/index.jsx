import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export function Logout() {
  const [, , removeProfile] = useLocalStorage("profile", null);
  const navigate = useNavigate();

  useEffect(() => {
    removeProfile();
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  }, [navigate, removeProfile]);

  return null;
}
