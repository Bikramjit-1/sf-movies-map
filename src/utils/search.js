import { cleanText } from './dataSf.js';

export function buildSuggestions(movies) {
  const values = new Set();

  movies.forEach((movie) => {
    [
      movie.title,
      movie.location,
      movie.neighborhood,
      movie.company,
      movie.director,
      ...movie.actors,
    ].forEach((value) => {
      if (value) {
        values.add(value);
      }
    });
  });

  return [...values].sort((a, b) => a.localeCompare(b)).slice(0, 350);
}

export function filterMovies(movies, query) {
  const term = normalize(query);

  if (!term) {
    return movies;
  }

  return movies.filter((movie) =>
    [
      movie.title,
      movie.year,
      movie.location,
      movie.funFact,
      movie.company,
      movie.director,
      movie.writer,
      movie.neighborhood,
      movie.district,
      ...movie.actors,
    ]
      .map(normalize)
      .some((value) => value.includes(term)),
  );
}

function normalize(value) {
  return cleanText(value).toLowerCase();
}
