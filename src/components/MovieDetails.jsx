function MovieDetails({ movie, allMovies }) {
  if (!movie) {
    return (
      <section
        className="rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-black/20 backdrop-blur"
        aria-label="Selected movie details"
      >
        <h2 className="text-lg font-black text-white">Pick a movie</h2>
        <p className="mt-2 leading-6 text-slate-300">
          Click a result to highlight its filming location and read the movie details here.
        </p>
      </section>
    );
  }

  const sameMovieLocations = allMovies.filter((item) => item.title === movie.title);
  const locationCount = new Set(sameMovieLocations.map((item) => item.location)).size;

  return (
    <section
      className="rounded-lg border border-orange-300/20 bg-white/[0.08] p-5 shadow-xl shadow-black/25 backdrop-blur"
      aria-label="Selected movie details"
    >
      <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-300">Selected movie</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-white">
        {movie.title}
        {movie.year ? ` (${movie.year})` : ''}
      </h2>
      <dl className="mt-4 grid gap-3">
        <div className="rounded-lg bg-white/[0.06] p-3">
          <dt className="text-xs font-black uppercase tracking-wider text-slate-400">Location</dt>
          <dd className="mt-1 leading-6 text-slate-100">{movie.location}</dd>
        </div>
        <div className="rounded-lg bg-white/[0.06] p-3">
          <dt className="text-xs font-black uppercase tracking-wider text-slate-400">
            San Francisco spots
          </dt>
          <dd className="mt-1 leading-6 text-slate-100">{locationCount.toLocaleString()}</dd>
        </div>
        {movie.director && (
          <div className="rounded-lg bg-white/[0.06] p-3">
            <dt className="text-xs font-black uppercase tracking-wider text-slate-400">Director</dt>
            <dd className="mt-1 leading-6 text-slate-100">{movie.director}</dd>
          </div>
        )}
        {movie.company && (
          <div className="rounded-lg bg-white/[0.06] p-3">
            <dt className="text-xs font-black uppercase tracking-wider text-slate-400">Production</dt>
            <dd className="mt-1 leading-6 text-slate-100">{movie.company}</dd>
          </div>
        )}
        {movie.actors.length > 0 && (
          <div className="rounded-lg bg-white/[0.06] p-3">
            <dt className="text-xs font-black uppercase tracking-wider text-slate-400">Cast</dt>
            <dd className="mt-1 leading-6 text-slate-100">{movie.actors.join(', ')}</dd>
          </div>
        )}
      </dl>
      {movie.funFact && (
        <p className="mt-4 border-l-4 border-orange-400 pl-3 leading-6 text-slate-300">
          {movie.funFact}
        </p>
      )}
    </section>
  );
}

export default MovieDetails;
