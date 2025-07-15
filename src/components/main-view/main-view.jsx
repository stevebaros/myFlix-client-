import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Vertigo",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Vertigomovie_restoration.jpg",
      author: "Alfred Hitchcock"
    },
    {
      id: 2,
      title: "Rope",
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/8e/Rope2.jpg",
      author: "Alfred Hitchcock"
    },
    {
      id: 3,
      title: "All About My Mother",
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d7/All_about_my_mother.jpg",
      author: "Pedro Almodovar"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } 

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
  }