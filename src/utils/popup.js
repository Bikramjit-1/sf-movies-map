export function makePopup(group) {
  const movies = group.movies.slice(0, 8);
  const hiddenCount = group.movies.length - movies.length;

  return `
    <section class="popup">
      <p class="popup-kicker">${group.movies.length} shoot${group.movies.length === 1 ? '' : 's'} here</p>
      ${movies
        .map(
          (movie) => `
            <article class="popup-movie">
              <strong>${escapeHtml(movie.title)}${movie.year ? ` (${escapeHtml(movie.year)})` : ''}</strong>
              <span>${escapeHtml(movie.location)}</span>
              ${movie.funFact ? `<small>${escapeHtml(movie.funFact)}</small>` : ''}
            </article>
          `,
        )
        .join('')}
      ${hiddenCount > 0 ? `<p class="popup-more">+ ${hiddenCount} more at this spot</p>` : ''}
    </section>
  `;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return replacements[character];
  });
}
