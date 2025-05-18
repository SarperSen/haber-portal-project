const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.resolve(__dirname, 'newsPortal.db');

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error('SQLite bağlantı hatası:', err.message);
    throw err;
  }
  console.log('SQLite veritabanına bağlandı.');

  // Finans tablosu
  db.run(
    `CREATE TABLE IF NOT EXISTS finance_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT,
      value TEXT,
      change_val TEXT,
      percent TEXT,
      direction TEXT
    )`,
    (err) => {
      if (err) console.error('Finance table oluşturulamadı:', err.message);
      else console.log('Finance tablosu hazır.');
    }
  );

  // News tablosu
  db.run(
    `CREATE TABLE IF NOT EXISTS news (
      key_id TEXT PRIMARY KEY,
      title TEXT,
      url TEXT,
      imageUrl TEXT,
      name TEXT,
      source TEXT
    )`,
    (err) => {
      if (err) console.error('News table oluşturulamadı:', err.message);
      else console.log('News tablosu hazır.');
    }
  );

  // Categorized news tablosu
  // Kategoriye göre ayrı ayrı tutulacak şekilde json objesi değil, kategori ve içerik olarak tablo
  db.run(
    `CREATE TABLE IF NOT EXISTS categorized_news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      news_id INTEGER,
      imageLink TEXT,
      newsLink TEXT,
      description TEXT
    )`,
    (err) => {
      if (err) console.error('Categorized news table oluşturulamadı:', err.message);
      else console.log('Categorized news tablosu hazır.');
    }
  );

  // Authors tablosu
  db.run(
    `CREATE TABLE IF NOT EXISTS authors (
      writerKey INTEGER PRIMARY KEY,
      name TEXT,
      category TEXT,
      description TEXT,
      imageUrl TEXT,
      url TEXT
    )`,
    (err) => {
      if (err) console.error('Authors table oluşturulamadı:', err.message);
      else console.log('Authors tablosu hazır.');
    }
  );

  // Slider haberleri tablosu
  db.run(
    `CREATE TABLE IF NOT EXISTS slider_news (
      id INTEGER PRIMARY KEY,
      imageLink TEXT,
      newsLink TEXT
    )`,
    (err) => {
      if (err) console.error('Slider news table oluşturulamadı:', err.message);
      else console.log('Slider news tablosu hazır.');
    }
  );
});

// --- Finans verisi ---
// Tüm finans verilerini getir
const getFinanceData = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM finance_data', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// --- Haberler ---
// Tüm haberleri getir
const getNews = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM news', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// --- Kategorili Haberler ---
// Kategoriye göre tüm haberleri getir
const getCategorizedNews = () => {
  return new Promise((resolve, reject) => {
    // Kategorilere göre grupla ve JSON formatında döndür
    db.all('SELECT * FROM categorized_news ORDER BY category, id', [], (err, rows) => {
      if (err) return reject(err);

      const grouped = {};
      rows.forEach((row) => {
        if (!grouped[row.category]) grouped[row.category] = [];
        grouped[row.category].push({
          id: row.news_id,
          imageLink: row.imageLink,
          newsLink: row.newsLink,
          description: row.description,
        });
      });
      resolve(grouped);
    });
  });
};

// --- Yazarlar ---
// Tüm yazarları getir
const getAuthors = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM authors', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// --- Slider haberleri ---
// Tüm slider haberlerini getir
const getSliderNews = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM slider_news ORDER BY id', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

module.exports = {
  db,
  getFinanceData,
  getNews,
  getCategorizedNews,
  getAuthors,
  getSliderNews,
};
