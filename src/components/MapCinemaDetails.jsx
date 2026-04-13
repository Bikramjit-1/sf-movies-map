function MapCinemaDetails({ movie, allMovies }) {
  if (!movie) {
    return (
      <aside className="pointer-events-none absolute bottom-6 right-6 z-[450] hidden w-[360px] rounded-lg border border-white/15 bg-slate-950/80 p-5 text-white shadow-2xl shadow-black/45 backdrop-blur-xl lg:block">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-300">Cinema details</p>
        <h2 className="mt-3 text-2xl font-black">Choose a title</h2>
        <p className="mt-2 leading-6 text-slate-300">
          Select a movie from the catalog or click a map marker to reveal its San Francisco filming
          story.
        </p>
      </aside>
    );
  }

  const sameMovieLocations = allMovies.filter((item) => item.title === movie.title);
  const locationCount = new Set(sameMovieLocations.map((item) => item.location)).size;

  return (
    <aside className="absolute bottom-6 right-6 z-[450] hidden w-[380px] overflow-hidden rounded-lg border border-white/15 bg-slate-950/85 text-white shadow-2xl shadow-black/50 backdrop-blur-xl lg:block">
      <div
        className="h-32 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(2, 6, 23, 0.1), rgba(2, 6, 23, 0.95)), url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80)',
        }}
      />
      <div className="-mt-10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-300">Now selected</p>
        <h2 className="mt-2 text-2xl font-black leading-tight">
          {movie.title}
          {movie.year ? ` (${movie.year})` : ''}
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/10 p-3">
            <span className="block text-2xl font-black text-white">{locationCount}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">SF spots</span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-3">
            <span className="block text-2xl font-black text-white">
              {movie.actors.length || '-'}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Cast names</span>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-orange-300">Location</p>
        <p className="mt-1 leading-6 text-slate-100">{movie.location}</p>
        {movie.funFact && <p className="mt-4 leading-6 text-slate-300">{movie.funFact}</p>}
      </div>
    </aside>
  );
}

export default MapCinemaDetails;
