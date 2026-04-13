import Stat from './Stat.jsx';

function StatsPanel({ movies }) {
  const uniqueTitles = new Set(movies.map((movie) => movie.title)).size;
  const uniqueLocations = new Set(movies.map((movie) => movie.location)).size;

  return (
    <div className="stats" aria-live="polite">
      <Stat label="shoots" value={movies.length.toLocaleString()} />
      <Stat label="movies" value={uniqueTitles.toLocaleString()} />
      <Stat label="locations" value={uniqueLocations.toLocaleString()} />
    </div>
  );
}

export default StatsPanel;
