import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addVisitedNews } from "../redux/visitedNewsSlice";

const API_BASE_URL = "http://localhost:5050/api";

export default function NewsList({ className = "" }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/news`);
        if (!res.ok) throw new Error("Haber verisi alınamadı");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Beklenmeyen veri formatı");
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const visibleNews = showAll ? news : news.slice(0, 6);

  const handleClick = (item) => {
    dispatch(addVisitedNews({
      key: item.key_id || item.key || item.id,  // backend’den gelen id/key_id olabilir
      url: item.url,
      imageUrl: item.imageUrl,
      name: item.name,
      source: item.source,
    }));
  };

  if (loading)
    return <div className={`${className} p-4 bg-white rounded shadow text-center`}>Yükleniyor...</div>;

  if (error)
    return (
      <div className={`${className} p-4 bg-white rounded shadow text-center text-red-600`}>
        {error}
      </div>
    );

  if (news.length === 0)
    return <div className={`${className} p-4 bg-white rounded shadow text-center`}>Haber bulunamadı.</div>;

  return (
    <div className={`${className} bg-white p-4 rounded shadow`}>
      <div
        className="flex flex-col space-y-4 overflow-y-auto transition-all duration-300"
        style={{ maxHeight: showAll ? "600px" : "auto" }}
      >
        {visibleNews.map((item) => (
          <a
            key={item.key_id || item.key || item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col md:flex-row bg-white rounded shadow hover:shadow-lg transition p-4 space-y-3 md:space-y-0 md:space-x-4"
            title={item.name}
            onClick={() => handleClick(item)}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full md:w-48 h-32 md:h-24 object-cover rounded"
              loading="lazy"
            />
            <div className="flex flex-col justify-between">
              <h3 className="font-semibold text-lg line-clamp-2">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.source}</p>
            </div>
          </a>
        ))}
      </div>

      {news.length > 6 && (
        <button
          onClick={() => setShowAll(prev => !prev)}
          className="mt-4 w-full text-center text-red-600 hover:text-red-800 font-semibold"
        >
          {showAll ? "Kapat" : "Devamını Gör"}
        </button>
      )}
    </div>
  );
}
