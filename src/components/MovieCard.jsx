import { getCoordinateKey } from '../utils/mapGroups.js';

function MovieCard({ movie, selectedMovie, onPick }) {
  const isSelected =
    selectedMovie && getCoordinateKey(movie) === getCoordinateKey(selectedMovie);

  return (
    <button
      className={`movie-card${isSelected ? ' selected' : ''}`}
      type="button"
      onClick={() => onPick(movie)}
      aria-pressed={isSelected}
    >
      <span>
        {movie.title}
        {movie.year ? ` (${movie.year})` : ''}
      </span>
      <small>{movie.location}</small>
    </button>
  );
}

export default MovieCard;
