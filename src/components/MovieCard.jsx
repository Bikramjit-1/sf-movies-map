import { getCoordinateKey } from '../utils/mapGroups.js';

function MovieCard({ movie, selectedMovie, onPick }) {
  const isSelected =
    selectedMovie && getCoordinateKey(movie) === getCoordinateKey(selectedMovie);

  return (
    <button
      className={`grid min-h-20 w-full gap-1 rounded-lg border p-4 text-left shadow-lg shadow-black/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-400/20 ${
        isSelected
          ? 'border-orange-300 bg-orange-300/15 text-white'
          : 'border-white/10 bg-white/[0.07] text-white hover:border-orange-300/70'
      }`}
      type="button"
      onClick={() => onPick(movie)}
      aria-pressed={isSelected}
    >
      <span className="text-lg font-black leading-tight">
        {movie.title}
        {movie.year ? ` (${movie.year})` : ''}
      </span>
      <small className="leading-5 text-slate-300">{movie.location}</small>
    </button>
  );
}

export default MovieCard;
