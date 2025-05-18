import React from "react";

export default function WeatherWidget() {
  return (
    <div
      className="weather-widget-container relative"
      style={{
        minWidth: "500px",
        maxWidth: "100%",
        backgroundColor: "#1f2937",
        padding: "10px",
        borderRadius: "8px",
        height: "420px",    // Sabit yükseklik
        overflowY: "hidden" // Aşağı doğru uzamayı engeller
      }}
    >
      <iframe
        src="https://www.meteoblue.com/tr/hava/widget/daily/%c4%b0zmir_t%c3%bcrkiye-cumhuriyeti_311046?geoloc=fixed&days=7&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=coloured&pictoicon=0&maxtemperature=1&mintemperature=1&windspeed=1&windgust=0&winddirection=1&uv=0&humidity=0&precipitation=1&precipitationprobability=1&spot=0&pressure=0&layout=dark"
        frameBorder="0"
        scrolling="no"
        allowTransparency="true"
        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
        style={{ width: "420px", height: "380px", display: "block", margin: "0 auto" }}
        title="Weather Widget"
      ></iframe>

      <div className="mt-2 text-center text-gray-300 text-xs">
        {/* Link zorunlu, bunu kaldırma */}
        <a
          href="https://www.meteoblue.com/tr/hava/hafta/%c4%b0zmir_t%c3%bcrkiye-cumhuriyeti_311046?utm_source=daily_widget&utm_medium=linkus&utm_content=daily&utm_campaign=Weather%2BWidget"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 underline"
        >
          meteoblue
        </a>
      </div>
    </div>
  );
}
