import { useMemo, useState } from 'react';
import FilmMap from './components/FilmMap.jsx';
import Header from './components/Header.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import PopularMovies from './components/PopularMovies.jsx';
import ResultsList from './components/ResultsList.jsx';
import SearchBox from './components/SearchBox.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import { useFilmLocations } from './hooks/useFilmLocations.js';
import { buildSuggestions, filterMovies, getPopularMovieTitles } from './utils/search.js';

function App() {
  const { movies, status, error } = useFilmLocations();
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const suggestions = useMemo(() => buildSuggestions(movies), [movies]);
  const popularMovies = useMemo(() => getPopularMovieTitles(movies), [movies]);
  const filteredMovies = useMemo(() => filterMovies(movies, query), [movies, query]);

  function handleQueryChange(nextQuery) {
    const exactMatch = movies.find(
      (movie) => movie.title.toLowerCase() === nextQuery.trim().toLowerCase(),
    );

    setQuery(nextQuery);
    setSelectedMovie(exactMatch || null);
  }

  function pickPopularMovie(title) {
    const firstLocation = movies.find((movie) => movie.title === title);

    setQuery(title);
    setSelectedMovie(firstLocation || null);
  }

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
          onQueryChange={handleQueryChange}
          onClear={clearSearch}
        />
        <PopularMovies movies={popularMovies} onPickMovie={pickPopularMovie} />
        <StatsPanel movies={filteredMovies} />
        <StatusMessage status={status} error={error} resultCount={filteredMovies.length} />
        <MovieDetails movie={selectedMovie} allMovies={movies} />
        <ResultsList
          movies={filteredMovies}
          selectedMovie={selectedMovie}
          onPickMovie={setSelectedMovie}
        />

        <footer>
          Devloped by <strong>Bikramjit Roy</strong>
        </footer>
      </section>

      <FilmMap
        movies={filteredMovies}
        selectedMovie={selectedMovie}
        onPickMovie={setSelectedMovie}
      />
    </main>
  );
}

export default App;
