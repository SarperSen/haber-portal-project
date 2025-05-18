const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

// GET: Tüm slider haberlerini getir
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM slider_news ORDER BY id';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Slider haberleri getirme hatası:', err.message);
      return res.status(500).json({ error: 'Slider haberleri getirilirken hata oluştu.' });
    }
    res.json(rows);
  });
});

// POST: Yeni slider haberi ekle
router.post('/', (req, res) => {
  const { id, imageLink, newsLink } = req.body;

  if (!id || !imageLink || !newsLink) {
    return res.status(400).json({ error: 'id, imageLink ve newsLink zorunludur.' });
  }

  const sql = 'INSERT INTO slider_news (id, imageLink, newsLink) VALUES (?, ?, ?)';
  const params = [id, imageLink, newsLink];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Slider haberi ekleme hatası:', err.message);
      return res.status(500).json({ error: 'Slider haberi eklenirken hata oluştu.' });
    }
    res.status(201).json({ message: 'Slider haberi başarıyla eklendi.', id: this.lastID });
  });
});

// DELETE: Slider haberini id ile sil
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM slider_news WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Slider haberi silme hatası:', err.message);
      return res.status(500).json({ error: 'Slider haberi silinirken hata oluştu.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Slider haberi bulunamadı.' });
    }
    res.json({ message: 'Slider haberi başarıyla silindi.' });
  });
});

module.exports = router;
