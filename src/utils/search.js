import { cleanText } from './dataSf.js';

export function buildSuggestions(movies) {
  const values = new Set();

  movies.forEach((movie) => {
    if (movie.title) {
      values.add(movie.title);
    }
  });

  return [...values].sort((a, b) => a.localeCompare(b)).slice(0, 350);
}

export function getPopularMovieTitles(movies, limit = 6) {
  const counts = new Map();

  movies.forEach((movie) => {
    if (!movie.title) {
      return;
    }

    counts.set(movie.title, (counts.get(movie.title) || 0) + 1);
  });

  return [...counts.entries()]
    .sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0]))
    .slice(0, limit)
    .map(([title, count]) => ({ title, count }));
}

export function filterMovies(movies, query) {
  const term = normalize(query);

  if (!term) {
    return movies;
  }

  return movies.filter((movie) => normalize(movie.title).includes(term));
}

function normalize(value) {
  return cleanText(value).toLowerCase();
}
