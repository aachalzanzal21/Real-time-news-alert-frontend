import { useEffect, useState } from 'react';
import api from '../utils/api';

const Headlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await api.get('/news/headlines');
        setHeadlines(res.data);
      } catch (err) {
        setError('Error fetching headlines.');
        console.error('Error fetching headlines', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div className="mt-5">
      <h3 className="mb-4 text-center">Latest Headlines</h3>
      {loading && <p className="text-center">Loading headlines...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && !error && (
        <div className="list-group">
          {headlines.length > 0 ? (
            headlines.map((headline, index) => (
              <a
                key={index}
                href={headline.url}
                target="_blank"
                rel="noopener noreferrer"
                className="list-group-item list-group-item-action"
              >
                <h5 className="mb-1">{headline.title}</h5>
                <small className="text-muted">{headline.source.name}</small>
              </a>
            ))
          ) : (
            <p className="text-center">No headlines found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Headlines;
