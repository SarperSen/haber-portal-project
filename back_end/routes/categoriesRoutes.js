const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

// GET: Tüm kategorili haberleri kategoriye göre gruplanmış şekilde getir
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM categorized_news ORDER BY category, id';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Kategorili haberler getirme hatası:', err.message);
      return res.status(500).json({ error: 'Kategorili haberler getirilirken hata oluştu.' });
    }

    // Haberleri kategoriye göre grupla
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

    res.json(grouped);
  });
});

// POST: Yeni kategorili haber ekle
router.post('/', (req, res) => {
  const { category, news_id, imageLink, newsLink, description } = req.body;

  if (!category || !newsLink) {
    return res.status(400).json({ error: 'category ve newsLink alanları zorunludur.' });
  }

  const sql = `
    INSERT INTO categorized_news (category, news_id, imageLink, newsLink, description)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [category, news_id || null, imageLink || '', newsLink, description || ''];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Kategorili haber ekleme hatası:', err.message);
      return res.status(500).json({ error: 'Kategorili haber eklenirken hata oluştu.' });
    }
    res.status(201).json({ message: 'Kategorili haber başarıyla eklendi.', id: this.lastID });
  });
});

// DELETE: id ile kategorili haber sil
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM categorized_news WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Kategorili haber silme hatası:', err.message);
      return res.status(500).json({ error: 'Kategorili haber silinirken hata oluştu.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Kategorili haber bulunamadı.' });
    }
    res.json({ message: 'Kategorili haber başarıyla silindi.' });
  });
});

module.exports = router;
