import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

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
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);


  useEffect(() => {
    if (!token) return;

    fetch("https://mymyflixapp-46a281636c8c.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id?.$oid || movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            director: movie.Director?.Name
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
      
        />
        <p className="separator">or</p>
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <Button variant="secondary"
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </Button>

        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <Button variant="secondary"
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </Button>
        <div>The list is empty!</div>
      </>
    );
  }

  // Replaced with the React Boostrap compatible code
  /*
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
};
*/

return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5} className="mt-4">
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8} className="mt-4">
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
<<<<<<< Updated upstream
};
=======
};
>>>>>>> Stashed changes
