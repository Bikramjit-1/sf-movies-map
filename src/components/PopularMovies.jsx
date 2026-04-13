function PopularMovies({ movies, onPickMovie }) {
  if (!movies.length) {
    return null;
  }

  return (
    <section className="popular-movies" aria-label="Popular movie searches">
      <h2>Popular movies</h2>
      <div className="movie-chips">
        {movies.map((movie) => (
          <button type="button" key={movie.title} onClick={() => onPickMovie(movie.title)}>
            <span>{movie.title}</span>
            <small>{movie.count} locations</small>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PopularMovies;
