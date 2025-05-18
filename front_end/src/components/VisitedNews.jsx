import React from "react";
import { useSelector } from "react-redux";

export default function VisitedNews({ className = "" }) {
  // Redux store'dan ziyaret edilen haberler
  const visitedNews = useSelector((state) => state.visitedNews.news);

  if (!visitedNews || visitedNews.length === 0) {
    return (
      <div className={`${className} bg-white p-4 rounded shadow text-center`}>
        Geçmiş haber yok.
      </div>
    );
  }

  // Son eklenen haberin en üstte görünmesi için diziyi ters çeviriyoruz
  const reversedVisitedNews = [...visitedNews].reverse();

  return (
    <div className={`${className} bg-white p-4 rounded shadow`}>
      <h2 className="text-xl font-semibold mb-4">Geçmiş Haberler</h2>

      <div className="grid grid-cols-1 gap-4">
        {reversedVisitedNews.map(({ key, url, imageUrl, name, description, source }) => {
          const displayName = name || description || "Geçmiş Haber";
          const displaySource = source || "Kaynak Yok";

          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded shadow hover:shadow-lg transition overflow-hidden w-full bg-white"
              title={displayName}
            >
              <div className="overflow-hidden rounded-t-md h-48 w-full">
                <img
                  src={imageUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="p-4 text-base font-medium line-clamp-3 text-gray-900">
                {displayName}
              </p>
              <p className="px-4 pb-4 text-sm text-gray-500">{displaySource}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
