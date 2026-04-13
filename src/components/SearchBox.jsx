function SearchBox({ query, suggestions, onQueryChange, onClear }) {
  return (
    <form className="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="movie-search">Search movie, actor, neighborhood, or location</label>
      <div className="search-row">
        <input
          id="movie-search"
          list="movie-suggestions"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try Bullitt, Chinatown, or Keanu Reeves"
          autoComplete="off"
        />
        <button type="button" onClick={onClear}>
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
