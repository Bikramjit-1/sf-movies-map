import { useMemo, useState } from 'react';
import FilmMap from './components/FilmMap.jsx';
import Header from './components/Header.jsx';
import MapCinemaDetails from './components/MapCinemaDetails.jsx';
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
    <main className="grid h-screen overflow-hidden bg-slate-950 text-white lg:grid-cols-[440px_1fr]">
      <section
        className="z-[500] flex h-screen flex-col gap-5 overflow-y-auto border-r border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl"
        aria-label="Movie filters"
      >
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

        <footer className="mt-auto border-t border-white/10 pt-5 text-slate-400">
          Developed by Bikramjit Roy
        </footer>
      </section>

      <section className="relative min-h-0 overflow-hidden">
        <FilmMap
          movies={filteredMovies}
          selectedMovie={selectedMovie}
          onPickMovie={setSelectedMovie}
        />
        <MapCinemaDetails movie={selectedMovie} allMovies={movies} />
      </section>
    </main>
  );
}

export default App;
