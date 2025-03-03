import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Container, Row, Spinner, Alert } from "react-bootstrap";

export function ProfilePage() {
  const { name } = useParams();
  const { data: profile, isLoading, isError } = useFetch(`https://v2.api.noroff.dev/holidaze/profile/${name}`);

  useEffect(() => {
    if (profile) {
      document.title = "Holidaze | " + profile.name;
    }
  }, [profile]);

  console.log(profile);
}
