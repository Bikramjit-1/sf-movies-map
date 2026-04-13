const DATASET_URL = 'https://data.sfgov.org/resource/yitu-d5am.json';

const fields = [
  'title',
  'release_year',
  'locations',
  'fun_facts',
  'production_company',
  'distributor',
  'director',
  'writer',
  'actor_1',
  'actor_2',
  'actor_3',
  'latitude',
  'longitude',
  'analysis_neighborhood',
  'supervisor_district',
];

export function buildDataUrl() {
  const params = new URLSearchParams({
    $select: fields.join(','),
    $limit: '50000',
    $order: 'title,release_year',
    $where: 'latitude IS NOT NULL AND longitude IS NOT NULL',
  });

  return `${DATASET_URL}?${params.toString()}`;
}

export function parseMovie(row, index) {
  return {
    id: `${row.title || 'untitled'}-${row.locations || 'unknown'}-${index}`,
    title: cleanText(row.title) || 'Untitled',
    year: cleanText(row.release_year),
    location: cleanText(row.locations) || 'Unknown location',
    funFact: cleanText(row.fun_facts),
    company: cleanText(row.production_company),
    distributor: cleanText(row.distributor),
    director: cleanText(row.director),
    writer: cleanText(row.writer),
    actors: [row.actor_1, row.actor_2, row.actor_3].map(cleanText).filter(Boolean),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    neighborhood: cleanText(row.analysis_neighborhood),
    district: cleanText(row.supervisor_district),
  };
}

export function cleanText(value) {
  return String(value || '').trim();
}
