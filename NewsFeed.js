import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem('token');
console.log("🔑 Token being sent:", localStorage.getItem('token'));
;
      try {
        const res = await axios.get('http://localhost:5000/api/news', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Fetched news:", res.data);
        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching news", err.response?.data || err.message);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      {articles.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold">
                {article.title}
              </a>
              <p className="text-sm text-gray-600">{article.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsFeed;
