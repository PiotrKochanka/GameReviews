import React, { useEffect, useState } from 'react';

function RSSFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch('http://localhost:8000/rss-feed'); // Zmień na odpowiedni URL swojego Laravel backendu
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchRSS();
  }, []);

  return (
    <div className="rss-feed">
      {articles.map((article, index) => (
        <div key={index} className="rss-item">
          {article.image && <img src={article.image} alt={article.title} className="rss-image" />}
          <h3>{article.title}</h3>
          <p>{new Date(article.pubDate).toLocaleDateString()}</p>
          <p>{article.description}</p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">Czytaj więcej</a>
        </div>
      ))}
    </div>
  );
}

export default RSSFeed;