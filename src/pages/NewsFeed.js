import { useEffect, useState } from 'react';
import api from '../utils/api';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/news');
        setArticles(res.data);
      } catch (err) {
        console.error('Error fetching news', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">News Feed</h2>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="list-group">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{article.title}</h5>
                <small>{new Date(article.publishedAt).toLocaleDateString()}</small>
              </div>
              <p className="mb-1">{article.description}</p>
              <small>{article.source.name}</small>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
