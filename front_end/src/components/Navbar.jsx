import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const menuItems = [
  {
    title: "Son Dakika",
    submenu: ["Türkiye", "Dünya", "Spor"],
  },
  {
    title: "Yazarlar",
    submenu: ["Politika", "Ekonomi", "Kültür-Sanat"],
  },
  {
    title: "Gündem",
    submenu: ["Siyaset", "Toplum", "Sağlık"],
  },
  {
    title: "Ekonomi",
    submenu: ["Finans", "Şirketler", "Piyasa"],
  },
  {
    title: "Dünya",
    submenu: ["ABD", "Avrupa", "Asya"],
  },
  {
    title: "Finans",
    submenu: ["Borsa", "Döviz", "Kredi Faizleri"],
  },
  {
    title: "Geçmiş",
    submenu: ["Arşiv", "Röportajlar", "Özel Dosyalar"],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-red-700 cursor-pointer select-none">
          NewsProject
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-semibold text-gray-800">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(idx)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="flex items-center space-x-1 hover:text-red-600 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openDropdown === idx ? "true" : "false"}
              >
                <span>{item.title}</span>
                {item.submenu.length > 0 && (
                  <svg
                    className="w-3 h-3 mt-1 text-gray-600 group-hover:text-red-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {item.submenu.length > 0 && openDropdown === idx && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-opacity duration-200">
                  {item.submenu.map((sub, subIdx) => (
                    <a
                      key={subIdx}
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-red-100 transition-colors"
                      tabIndex={0}
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-red-700" />
          ) : (
            <Menu className="w-6 h-6 text-red-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {menuItems.map((item, idx) => (
            <div key={idx} className="border-b border-gray-200">
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold hover:bg-red-50 focus:outline-none"
                onClick={() =>
                  setOpenDropdown(openDropdown === idx ? null : idx)
                }
                aria-expanded={openDropdown === idx}
                aria-controls={`submenu-mobile-${idx}`}
              >
                <span>{item.title}</span>
                {item.submenu.length > 0 && (
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      openDropdown === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              {item.submenu.length > 0 && openDropdown === idx && (
                <div
                  id={`submenu-mobile-${idx}`}
                  className="bg-gray-50"
                >
                  {item.submenu.map((sub, subIdx) => (
                    <a
                      key={subIdx}
                      href="#"
                      className="block px-8 py-2 text-gray-700 hover:bg-red-100 transition-colors"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
