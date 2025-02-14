import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
// import { VenueCard } from "../../components/VenueCard";

export function HomePage() {
  const { data, isLoading, isError } = useFetch("https://v2.api.noroff.dev/holidaze/venues");

  useEffect(() => {
    document.title = "Home";
  }, []);

  console.log(data);

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (isError) {
    return <div className="alert alert-danger mt-5">Error</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Venues</h1>
    </div>
  );
}
