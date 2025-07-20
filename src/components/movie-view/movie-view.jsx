import { Card, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="p-4 mt-3 shadow-sm">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
        <Button onClick={onBackClick} variant="link">
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};