function StatusMessage({ status, error, resultCount }) {
  if (status === 'loading') {
    return <p className="notice">Loading Film Locations from DataSF...</p>;
  }

  if (status === 'error') {
    return (
      <p className="notice error">
        Could not load the DataSF feed. {error ? `(${error})` : 'Please try again later.'}
      </p>
    );
  }

  if (status === 'ready' && resultCount === 0) {
    return <p className="notice">No filming locations match that search.</p>;
  }

  return null;
}

export default StatusMessage;
