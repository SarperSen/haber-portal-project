import React, { useEffect, useState } from "react";

export default function Slider() {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5050/api/slider-news")   // Backend API adresini buraya yaz
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setNews(data);
        } else if (data.slider_news) {
          setNews(data.slider_news);
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

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [news]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  if (loading)
    return (
      <div
        className="bg-white rounded shadow flex items-center justify-center text-gray-500 font-semibold"
        style={{ width: 696, height: 539, maxWidth: "100%" }}
      >
        Yükleniyor...
      </div>
    );

  if (error)
    return (
      <div
        className="bg-white rounded shadow flex items-center justify-center text-red-500 font-semibold"
        style={{ width: 696, height: 539, maxWidth: "100%" }}
      >
        {error}
      </div>
    );

  if (news.length === 0)
    return (
      <div
        className="bg-white rounded shadow flex items-center justify-center text-gray-500 font-semibold"
        style={{ width: 696, height: 839, maxWidth: "100%" }}
      >
        Haber bulunamadı.
      </div>
    );

  const currentNews = news[currentIndex];

  return (
    <div
      className="relative bg-white rounded shadow-md overflow-hidden select-none flex items-center justify-center"
      style={{ width: 796, height: 609, maxWidth: "100%" }}
    >
      <a
        href={currentNews.newsLink}
        target="_blank"
        rel="noopener noreferrer"
        title={`Haber ${currentNews.id}`}
        className="block w-full h-full relative"
      >
        <img
          src={currentNews.imageLink}
          alt={`Haber ${currentNews.id}`}
          className="w-full h-full object-cover"
          loading="eager"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </a>

      {/* Sol Buton */}
      <button
        onClick={goPrev}
        aria-label="Önceki haber"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition-shadow shadow-lg"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Sağ Buton */}
      <button
        onClick={goNext}
        aria-label="Sonraki haber"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition-shadow shadow-lg"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
