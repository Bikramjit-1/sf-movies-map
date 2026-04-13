import { useMemo, useState } from 'react';
import FilmMap from './components/FilmMap.jsx';
import Header from './components/Header.jsx';
import ResultsList from './components/ResultsList.jsx';
import SearchBox from './components/SearchBox.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import { useFilmLocations } from './hooks/useFilmLocations.js';
import { buildSuggestions, filterMovies } from './utils/search.js';

function App() {
  const { movies, status, error } = useFilmLocations();
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const suggestions = useMemo(() => buildSuggestions(movies), [movies]);
  const filteredMovies = useMemo(() => filterMovies(movies, query), [movies, query]);

  function clearSearch() {
    setQuery('');
    setSelectedMovie(null);
  }

  return (
    <main className="app-shell">
      <section className="sidebar" aria-label="Movie filters">
        <Header />
        <SearchBox
          query={query}
          suggestions={suggestions}
          onQueryChange={setQuery}
          onClear={clearSearch}
        />
        <StatsPanel movies={filteredMovies} />
        <StatusMessage status={status} error={error} resultCount={filteredMovies.length} />
        <ResultsList
          movies={filteredMovies}
          selectedMovie={selectedMovie}
          onPickMovie={setSelectedMovie}
        />

        <footer>
          Data from{' '}
          <a href="https://data.sfgov.org/d/yitu-d5am" target="_blank" rel="noreferrer">
            DataSF Film Locations
          </a>
          .
        </footer>
      </section>

      <FilmMap movies={filteredMovies} selectedMovie={selectedMovie} />
    </main>
  );
}

export default App;
