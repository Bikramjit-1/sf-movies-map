import MovieCard from './MovieCard.jsx';

function ResultsList({ movies, selectedMovie, onPickMovie }) {
  const visibleMovies = movies.slice(0, 12);

  return (
    <div className="results" aria-label="Matching filming locations">
      {visibleMovies.map((movie) => (
        <MovieCard
          movie={movie}
          selectedMovie={selectedMovie}
          onPick={onPickMovie}
          key={movie.id}
        />
      ))}
    </div>
  );
}

export default ResultsList;
