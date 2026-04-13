function StatusMessage({ status, error, resultCount }) {
  if (status === 'loading') {
    return (
      <p className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 leading-6 text-cyan-100">
        Loading Film Locations from DataSF...
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p className="rounded-lg border border-red-300/20 bg-red-400/10 p-4 leading-6 text-red-100">
        Could not load the DataSF feed. {error ? `(${error})` : 'Please try again later.'}
      </p>
    );
  }

  if (status === 'ready' && resultCount === 0) {
    return (
      <p className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 leading-6 text-amber-100">
        No filming locations match that search.
      </p>
    );
  }

  return null;
}

export default StatusMessage;
