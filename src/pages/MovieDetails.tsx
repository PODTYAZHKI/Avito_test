import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  return (
    <>
      <h1>MovieDetails Page</h1>
      <p>Details of movie with ID: {id}</p>
    </>
  );
};

export default MovieDetails;
