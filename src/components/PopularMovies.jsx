function PopularMovies({ movies, onPickMovie }) {
  if (!movies.length) {
    return null;
  }

  return (
    <section className="grid gap-3" aria-label="Popular movie searches">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-300">Trending</p>
        <h2 className="mt-1 text-xl font-black text-white">Popular movies</h2>
      </div>
      <div className="grid gap-3">
        {movies.slice(0, 3).map((movie, index) => (
          <button
            className="group relative min-h-28 overflow-hidden rounded-lg border border-white/10 bg-slate-900 text-left shadow-xl shadow-black/25"
            type="button"
            key={movie.title}
            onClick={() => onPickMovie(movie.title)}
          >
            <span
              className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(2, 6, 23, 0.94), rgba(2, 6, 23, 0.45)), url(${posterImages[index]})`,
              }}
            />
            <span className="relative z-10 grid h-full content-end gap-1 p-4">
              <span className="w-fit rounded bg-orange-600 px-2 py-1 text-xs font-black uppercase tracking-wider text-white">
                Featured
              </span>
              <span className="text-xl font-black text-white">{movie.title}</span>
              <small className="font-bold text-slate-300">{movie.count} locations</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

const posterImages = [
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
];

export default PopularMovies;
