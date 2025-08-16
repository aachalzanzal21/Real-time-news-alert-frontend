import { useEffect, useState } from 'react';
import api from '../utils/api';
import Headlines from '../components/Headlines';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await api.get('/news/all', {
        params: {
          category,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      });
      setArticles(res.data);
    } catch (err) {
      setError('Error fetching news. Please try again later.');
      console.error('Error fetching news', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setCategory(value);
    } else {
      setDateRange((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="mb-4 text-center">News Feed</h2>

          <form onSubmit={handleFilterSubmit} className="mb-4 p-4 bg-light rounded">
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="category" className="form-label">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleFilterChange}
                  className="form-control"
                  placeholder="e.g., technology"
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleFilterChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="endDate" className="form-label">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleFilterChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100">Filter</button>
              </div>
            </div>
          </form>

          {loading && <p className="text-center">Loading news...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          {!loading && !error && (
            <div className="list-group">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between flex-wrap">
                      <h5 className="mb-1">{article.title}</h5>
                      <small>{new Date(article.publishedAt).toLocaleDateString()}</small>
                    </div>
                    <p className="mb-1">{article.description}</p>
                    <small className="text-muted">{article.source.name}</small>
                  </a>
                ))
              ) : (
                <p className="text-center">No news articles found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Headlines />
    </div>
  );
};

export default NewsFeed;
