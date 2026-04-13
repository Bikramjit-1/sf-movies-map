import { useEffect, useState } from 'react';
import { buildDataUrl, parseMovie } from '../utils/dataSf.js';

export function useFilmLocations() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      try {
        setStatus('loading');
        const response = await fetch(buildDataUrl());

        if (!response.ok) {
          throw new Error(`DataSF returned ${response.status}`);
        }

        const rows = await response.json();
        const parsed = rows
          .map(parseMovie)
          .filter((movie) => Number.isFinite(movie.latitude) && Number.isFinite(movie.longitude));

        if (!cancelled) {
          setMovies(parsed);
          setStatus('ready');
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message);
          setStatus('error');
        }
      }
    }

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  return { movies, status, error };
}
