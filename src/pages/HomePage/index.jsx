import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { VenueCard } from "../../components/VenueCard";
import { Container, Row, Spinner, Alert, Pagination } from "react-bootstrap";

export function HomePage() {
  const { data, isLoading, isError } = useFetch("https://v2.api.noroff.dev/holidaze/venues");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    document.title = "Holidaze | Home";
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
        <Alert variant="danger">Error fetching venues</Alert>
      </Container>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Container className="mt-5">
      <h1>Venues</h1>
      <Row>{currentItems.length > 0 ? currentItems.map((venue) => <VenueCard key={venue.id} venue={venue} />) : <p className="text-center">No venues available</p>}</Row>
      <Pagination className="justify-content-center mt-4">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
}

// import React, { useEffect, useState } from "react";
// import { useFetch } from "../../hooks/useFetch";
// import { VenueCard } from "../../components/VenueCard";
// import { Container, Row, Spinner, Alert, Pagination } from "react-bootstrap";

// export function HomePage() {
//   const { data, isLoading, isError } = useFetch("https://v2.api.noroff.dev/holidaze/venues");
//   const [currentPage, setCurrentPage] = useState(1);
//   const venuesPerPage = 20;

//   useEffect(() => {
//     document.title = "Holidaze | Home";
//   }, []);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo(0, 0);
//   };

//   const indexOfLastVenue = currentPage * venuesPerPage;
//   const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
//   const currentVenues = data.slice(indexOfFirstVenue, indexOfLastVenue);
//   const totalPages = Math.ceil(data.length / venuesPerPage);

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
//         <Alert variant="danger">Error fetching venues</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <h1>Venues</h1>
//       <Row>{currentVenues.length > 0 ? currentVenues.map((venue) => <VenueCard key={venue.id} venue={venue} />) : <p className="text-center">No venues available</p>}</Row>
//       <div className="d-flex justify-content-center mt-4">
//         <Pagination>
//           <Pagination.Prev onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
//           {Array.from({ length: totalPages }, (_, index) => (
//             <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
//               {index + 1}
//             </Pagination.Item>
//           ))}
//           <Pagination.Next onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
//         </Pagination>
//       </div>
//     </Container>
//   );
// }
