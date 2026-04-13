import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { SF_BOUNDS, SF_CENTER } from '../constants/map.js';
import { getCoordinateKey, groupByCoordinate } from '../utils/mapGroups.js';
import { makePopup } from '../utils/popup.js';

const DEFAULT_MARKER_STYLE = {
  color: '#112a2c',
  fillColor: '#f45b69',
  fillOpacity: 0.82,
  weight: 1.5,
};

const SELECTED_MARKER_STYLE = {
  color: '#112a2c',
  fillColor: '#f6d06f',
  fillOpacity: 0.95,
  weight: 3,
};

function FilmMap({ movies, selectedMovie, onPickMovie }) {
  const mapElement = useRef(null);
  const map = useRef(null);
  const layer = useRef(null);

  useEffect(() => {
    if (!mapElement.current || map.current) {
      return;
    }

    map.current = L.map(mapElement.current, {
      center: SF_CENTER,
      zoom: 12,
      minZoom: 11,
      maxBounds: SF_BOUNDS,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map.current);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.current);

    layer.current = L.layerGroup().addTo(map.current);
  }, []);

  useEffect(() => {
    if (!map.current || !layer.current) {
      return;
    }

    layer.current.clearLayers();
    const groups = groupByCoordinate(movies);
    const selectedKey = selectedMovie ? getCoordinateKey(selectedMovie) : '';

    groups.forEach((group) => {
      const isSelected = group.key === selectedKey;
      const marker = L.circleMarker([group.latitude, group.longitude], {
        ...(isSelected ? SELECTED_MARKER_STYLE : DEFAULT_MARKER_STYLE),
        radius: Math.min((isSelected ? 12 : 8) + group.movies.length * 0.6, isSelected ? 22 : 18),
      }).bindPopup(makePopup(group), {
        maxWidth: 320,
        className: 'movie-popup',
      });

      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());
      marker.on('click', () => onPickMovie(group.movies[0]));

      marker.addTo(layer.current);

      if (isSelected) {
        marker.openPopup();
        marker.bringToFront();
      }
    });
  }, [movies, selectedMovie, onPickMovie]);

  useEffect(() => {
    if (!map.current || !movies.length) {
      return;
    }

    const bounds = movies.map((movie) => [movie.latitude, movie.longitude]);

    if (bounds.length === 1) {
      map.current.setView(bounds[0], 15, { animate: true });
    } else if (bounds.length > 1) {
      map.current.fitBounds(bounds, {
        padding: [42, 42],
        maxZoom: 14,
        animate: true,
      });
    }
  }, [movies]);

  useEffect(() => {
    if (!map.current || !selectedMovie) {
      return;
    }

    map.current.flyTo([selectedMovie.latitude, selectedMovie.longitude], 15, {
      duration: 0.8,
    });
  }, [selectedMovie]);

  return <div className="map" ref={mapElement} aria-label="San Francisco movie filming map" />;
}

export default FilmMap;
