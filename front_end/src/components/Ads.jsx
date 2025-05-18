import React, { useState } from "react";
import kareReklam from "../assets/kareReklam.jpg";
import yukariUzunReklam from "../assets/yukarıUzunReklam.jpg";

export default function Ads({ position }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  let imgSrc = null;
  let containerStyle = {};
  let imgStyle = {};

  if (position === "left") {
    imgSrc = yukariUzunReklam;
    containerStyle = {
      position: "sticky",
      top: "96px",
      width: "280px",        // Genişlik artırıldı
      maxHeight: "750px",    // Yükseklik artırıldı
      marginLeft: 0,         // Sol kenara hizalama için margin sıfırlandı
      marginRight: "auto",   // Sağa otomatik margin
      zIndex: 100,
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
      padding: "8px",
      left: 0,               // Sol kenara yapışması için left 0
    };
    imgStyle = {
      width: "100%",
      height: "auto",
      objectFit: "contain",
      borderRadius: "6px",
      userSelect: "none",
    };
  } else if (position === "right") {
    imgSrc = kareReklam;
    containerStyle = {
      position: "sticky",
      top: "96px",
      width: "360px",        // Sağ reklam büyütüldü
      maxHeight: "600px",    // Yükseklik artırıldı
      margin: "0 auto",
      marginBottom: "16px",
      zIndex: 100,
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
      padding: "8px",
    };
    imgStyle = {
      width: "100%",
      height: "auto",
      objectFit: "contain",
      borderRadius: "6px",
      userSelect: "none",
    };
  } else {
    return null;
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Reklamı kapat"
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          background: "rgba(0,0,0,0.5)",
          border: "none",
          borderRadius: "50%",
          color: "white",
          width: 24,
          height: 24,
          cursor: "pointer",
          fontWeight: "bold",
          lineHeight: 1,
          zIndex: 110,
        }}
      >
        &times;
      </button>

      <img src={imgSrc} alt={`${position} reklam`} style={imgStyle} loading="lazy" />
    </div>
  );
}
