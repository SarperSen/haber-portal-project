import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function FinansBar() {
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/finance`)
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => {
        // Backend'den direkt dizi dönerse:
        if (Array.isArray(data)) {
          setFinanceData(data);
        } 
        // Ya da "finance_data" objesi içinde geliyorsa:
        else if (data.finance_data && Array.isArray(data.finance_data)) {
          setFinanceData(data.finance_data);
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
    return (
      <div className="bg-gray-100 py-2 text-center text-gray-600 font-medium">
        Yükleniyor...
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 py-2 text-center text-red-600 font-medium">
        {error}
      </div>
    );

  // Sonsuz kaydırma için veriyi iki kez tekrar etmek gerekli değilse
  const repeatedData = [...financeData];

  return (
    <div className="bg-gray-100 border-t border-gray-300 py-2 overflow-hidden relative">
      <div
        className="flex items-center px-4 text-sm font-medium text-gray-700 whitespace-nowrap"
        style={{
          animation: "marquee 25s linear infinite",
          gap: "60px",
        }}
      >
        {repeatedData.map(({ label, value, change_val, percent, direction }, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 min-w-[160px]"
            title={`${label} ${value} (${change_val} ${percent})`}
          >
            <span className="font-semibold">{label}</span>
            <span>{value}</span>
            <span
              className={`flex items-center ${
                direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {direction === "up" ? (
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              )}
              <span>{change_val} {percent}</span>
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%) }
          100% { transform: translateX(-50%) }
        }
      `}</style>
    </div>
  );
}
