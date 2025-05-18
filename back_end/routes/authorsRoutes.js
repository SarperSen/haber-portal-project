const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

// GET: Tüm yazarları listele
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM authors ORDER BY writerKey';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Yazarlar getirme hatası:', err.message);
      return res.status(500).json({ error: 'Yazarlar getirilirken hata oluştu.' });
    }
    res.json(rows);
  });
});

// POST: Yeni yazar ekle
router.post('/', (req, res) => {
  const { writerKey, name, category, description, imageUrl, url } = req.body;

  // writerKey 0 da olabilir, bu yüzden sadece undefined/null kontrolü yapılmalı
  if (writerKey === undefined || writerKey === null || !name) {
    return res.status(400).json({ error: 'writerKey ve name zorunludur.' });
  }

  const sql =
    'INSERT INTO authors (writerKey, name, category, description, imageUrl, url) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [writerKey, name, category || '', description || '', imageUrl || '', url || ''];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Yazar ekleme hatası:', err.message);
      return res.status(500).json({ error: 'Yazar eklenirken hata oluştu.' });
    }
    res.status(201).json({ message: 'Yazar başarıyla eklendi.', id: this.lastID });
  });
});

// DELETE: Yazarı writerKey ile sil
router.delete('/:writerKey', (req, res) => {
  const { writerKey } = req.params;
  const sql = 'DELETE FROM authors WHERE writerKey = ?';

  db.run(sql, [writerKey], function (err) {
    if (err) {
      console.error('Yazar silme hatası:', err.message);
      return res.status(500).json({ error: 'Yazar silinirken hata oluştu.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Yazar bulunamadı.' });
    }
    res.json({ message: 'Yazar başarıyla silindi.' });
  });
});

module.exports = router;
