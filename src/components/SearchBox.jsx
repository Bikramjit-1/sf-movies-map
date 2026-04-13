function SearchBox({ query, suggestions, onQueryChange, onClear }) {
  return (
    <form
      className="rounded-lg border border-white/10 bg-white/[0.07] p-4 shadow-xl shadow-black/20 backdrop-blur"
      onSubmit={(event) => event.preventDefault()}
    >
      <label
        className="text-sm font-black uppercase tracking-[0.2em] text-slate-300"
        htmlFor="movie-search"
      >
        Search movie title
      </label>
      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
        <input
          className="min-w-0 rounded-lg border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20"
          id="movie-search"
          list="movie-suggestions"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try Bullitt or The Matrix Resurrections"
          autoComplete="off"
        />
        <button
          className="rounded-lg bg-orange-600 px-4 font-black text-white shadow-lg shadow-orange-950/35 transition hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-400/25"
          type="button"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
      <datalist id="movie-suggestions">
        {suggestions.map((suggestion) => (
          <option value={suggestion} key={suggestion} />
        ))}
      </datalist>
    </form>
  );
}

export default SearchBox;
