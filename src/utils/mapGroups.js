export function getCoordinateKey(movie) {
  return `${movie.latitude.toFixed(5)},${movie.longitude.toFixed(5)}`;
}

export function groupByCoordinate(movies) {
  const grouped = new Map();

  movies.forEach((movie) => {
    const key = getCoordinateKey(movie);
    const existing = grouped.get(key);

    if (existing) {
      existing.movies.push(movie);
    } else {
      grouped.set(key, {
        key,
        latitude: movie.latitude,
        longitude: movie.longitude,
        movies: [movie],
      });
    }
  });

  return [...grouped.values()];
}
