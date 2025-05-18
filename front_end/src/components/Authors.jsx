import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Authors({ className = "" }) {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/authors`) 
      .then((res) => {
        if (!res.ok) throw new Error("Yazar verisi alınamadı");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setWriters(data);
        } else {
          throw new Error("Beklenmeyen veri formatı");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className={`${className} p-4 bg-white rounded shadow text-center`}>Yükleniyor...</div>;

  if (error)
    return (
      <div className={`${className} p-4 bg-white rounded shadow text-center text-red-600`}>
        {error}
      </div>
    );

  if (writers.length === 0)
    return <div className={`${className} p-4 bg-white rounded shadow text-center`}>Yazar bulunamadı.</div>;

  const visibleWriters = showAll ? writers : writers.slice(0, 3);

  return (
    <div className={`${className} bg-white p-4 rounded shadow`}>
      <div
        className="flex flex-col space-y-4 overflow-y-auto transition-all duration-300"
        style={{ maxHeight: showAll ? "600px" : "auto" }}
      >
        {visibleWriters.map(({ writerKey, name, category, description, imageUrl, url }) => (
          <a
            key={writerKey}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded transition"
            title={name}
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-16 h-16 object-cover rounded"
              loading="lazy"
            />
            <div className="flex flex-col">
              <h4 className="font-semibold text-lg">{name}</h4>
              <p className="text-sm text-gray-500 italic">{category}</p>
              <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
            </div>
          </a>
        ))}
      </div>

      {writers.length > 3 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-4 w-full text-center text-red-600 hover:text-red-800 font-semibold"
          aria-label={showAll ? "Yazarları gizle" : "Daha fazla yazar göster"}
        >
          {showAll ? "Kapat" : "Devamını Gör"}
        </button>
      )}
    </div>
  );
}
