import { useEffect, useMemo, useState } from 'react';
import MovieCard from './MovieCard.jsx';
import { getCoordinateKey } from '../utils/mapGroups.js';

const MOVIES_PER_PAGE = 5;

function ResultsList({ movies, selectedMovie, onPickMovie }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(movies.length / MOVIES_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [movies]);

  useEffect(() => {
    if (!selectedMovie) {
      return;
    }

    const selectedKey = getCoordinateKey(selectedMovie);
    const selectedIndex = movies.findIndex((movie) => getCoordinateKey(movie) === selectedKey);

    if (selectedIndex >= 0) {
      setCurrentPage(Math.floor(selectedIndex / MOVIES_PER_PAGE) + 1);
    }
  }, [movies, selectedMovie]);

  const visibleMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;

    return movies.slice(startIndex, startIndex + MOVIES_PER_PAGE);
  }, [currentPage, movies]);

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function goToNextPage() {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }

  return (
    <section className="pick-movie" aria-label="Pick a movie">
      <div className="section-heading">
        <h2>Pick a movie</h2>
        <span>{movies.length.toLocaleString()} matches</span>
      </div>

      <div className="results">
        {visibleMovies.map((movie) => (
          <MovieCard
            movie={movie}
            selectedMovie={selectedMovie}
            onPick={onPickMovie}
            key={movie.id}
          />
        ))}
      </div>

      {movies.length > MOVIES_PER_PAGE && (
        <div className="pagination" aria-label="Movie list pagination">
          <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button type="button" onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default ResultsList;
