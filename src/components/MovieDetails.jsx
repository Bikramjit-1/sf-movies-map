function MovieDetails({ movie, allMovies }) {
  if (!movie) {
    return (
      <section className="movie-details empty" aria-label="Selected movie details">
        <h2>Pick a movie</h2>
        <p>Click a result to highlight its filming location and read the movie details here.</p>
      </section>
    );
  }

  const sameMovieLocations = allMovies.filter((item) => item.title === movie.title);
  const locationCount = new Set(sameMovieLocations.map((item) => item.location)).size;

  return (
    <section className="movie-details" aria-label="Selected movie details">
      <p className="eyebrow">Selected movie</p>
      <h2>
        {movie.title}
        {movie.year ? ` (${movie.year})` : ''}
      </h2>
      <dl>
        <div>
          <dt>Location</dt>
          <dd>{movie.location}</dd>
        </div>
        <div>
          <dt>San Francisco spots</dt>
          <dd>{locationCount.toLocaleString()}</dd>
        </div>
        {movie.director && (
          <div>
            <dt>Director</dt>
            <dd>{movie.director}</dd>
          </div>
        )}
        {movie.company && (
          <div>
            <dt>Production</dt>
            <dd>{movie.company}</dd>
          </div>
        )}
        {movie.actors.length > 0 && (
          <div>
            <dt>Cast</dt>
            <dd>{movie.actors.join(', ')}</dd>
          </div>
        )}
      </dl>
      {movie.funFact && <p className="fun-fact">{movie.funFact}</p>}
    </section>
  );
}

export default MovieDetails;
