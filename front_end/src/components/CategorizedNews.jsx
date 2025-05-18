import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addVisitedNews } from "../redux/visitedNewsSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CategorizedNews({ className = "" }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Her kategori için açık/kapalı durumu tutar
  const [showAll, setShowAll] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)  // Backend endpoint'i buraya göre değiştir
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((json) => {
        if (json && typeof json === "object" && Object.keys(json).length > 0) {
          setData(json);
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

  const categories = Object.keys(data);

  const toggleShowAll = (category) => {
    setShowAll((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Redux'a eklerken, tek bir id veya newsLink üzerinden key sağlamak önemli, böylece tekrar eklenmez
  const handleClick = (item) => {
    dispatch(
      addVisitedNews({
        key: item.id?.toString() || item.newsLink,
        url: item.newsLink,
        imageUrl: item.imageLink,
        description: item.description,
      })
    );
  };

  return (
    <div className={`${className} bg-white p-4 rounded shadow`}>
      {categories.length === 0 && <p className="text-center">Kategori bulunamadı.</p>}

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h3 className="text-xl font-semibold mb-3 capitalize">{cat}</h3>

          <div className="grid grid-cols-1 gap-4">
            {(showAll[cat] ? data[cat] : data[cat].slice(0, 1)).map(({ id, imageLink, newsLink, description }) => (
              <a
                key={id || newsLink}
                href={newsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded shadow hover:shadow-lg transition overflow-hidden w-full bg-white"
                title={description}
                onClick={() => handleClick({ id, newsLink, imageLink, description })}
              >
                <div className="overflow-hidden rounded-t-md h-48 w-full">
                  <img
                    src={imageLink}
                    alt={description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="p-4 text-base font-medium line-clamp-3 text-gray-900">
                  {description}
                </p>
              </a>
            ))}
          </div>

          <button
            onClick={() => toggleShowAll(cat)}
            className="mt-2 w-full text-center text-red-600 hover:text-red-800 font-semibold"
          >
            {showAll[cat] ? "Kapat" : "Daha Fazla"}
          </button>
        </div>
      ))}
    </div>
  );
}
