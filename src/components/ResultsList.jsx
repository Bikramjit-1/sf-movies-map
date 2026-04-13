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
    <section className="grid gap-3" aria-label="Pick a movie">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-white">Pick a movie</h2>
        <span className="text-sm font-black text-slate-400">{movies.length.toLocaleString()} matches</span>
      </div>

      <div className="grid gap-3">
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
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3" aria-label="Movie list pagination">
          <button
            className="rounded-lg border border-white/10 bg-white/[0.08] px-4 py-3 font-black text-white transition hover:border-orange-300 disabled:cursor-not-allowed disabled:text-slate-600"
            type="button"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-center text-sm font-black text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="rounded-lg border border-white/10 bg-white/[0.08] px-4 py-3 font-black text-white transition hover:border-orange-300 disabled:cursor-not-allowed disabled:text-slate-600"
            type="button"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default ResultsList;
