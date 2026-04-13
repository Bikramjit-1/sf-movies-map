# SF Movies

A React service that maps movie filming locations in San Francisco and lets users filter the map with autocomplete search.

## Data

The app loads public records from the DataSF Film Locations dataset:

Dataset page:

`https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am/about_data`

JSON API endpoint used by the app:

`https://data.sfgov.org/resource/yitu-d5am.json`

The current dataset includes latitude and longitude fields, so the app can place filming locations directly on the map.

## Run

Install Node.js, then run:

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Project Structure

```text
src/
  App.jsx
  main.jsx
  styles.css
  components/
    FilmMap.jsx
    Header.jsx
    MovieCard.jsx
    ResultsList.jsx
    SearchBox.jsx
    Stat.jsx
    StatsPanel.jsx
    StatusMessage.jsx
  constants/
    map.js
  hooks/
    useFilmLocations.js
  utils/
    dataSf.js
    mapGroups.js
    popup.js
    search.js
```

## Features

- Interactive San Francisco map using Leaflet and OpenStreetMap tiles
- Live DataSF fetch with no backend required
- Autocomplete search across titles, locations, neighborhoods, production companies, directors, and actors
- Map markers grouped by shared coordinates
- Result cards that fly the map to a selected filming location
