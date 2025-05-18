const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

// GET: Tüm haberleri listele
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM news ORDER BY key_id';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Haberler getirme hatası:', err.message);
      return res.status(500).json({ error: 'Haberler getirilirken hata oluştu.' });
    }
    res.json(rows);
  });
});

// POST: Yeni haber ekle
router.post('/', (req, res) => {
  const { key_id, title, url, imageUrl, name, source } = req.body;

  if (!key_id || !name) {
    return res.status(400).json({ error: 'key_id ve name zorunludur.' });
  }

  const sql =
    'INSERT INTO news (key_id, title, url, imageUrl, name, source) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [
    key_id,
    title || '',
    url || '',
    imageUrl || '',
    name,
    source || '',
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Haber ekleme hatası:', err.message);
      return res.status(500).json({ error: 'Haber eklenirken hata oluştu.' });
    }
    res.status(201).json({ message: 'Haber başarıyla eklendi.', id: this.lastID });
  });
});

// DELETE: Haberi key_id ile sil
router.delete('/:key_id', (req, res) => {
  const { key_id } = req.params;
  const sql = 'DELETE FROM news WHERE key_id = ?';

  db.run(sql, [key_id], function (err) {
    if (err) {
      console.error('Haber silme hatası:', err.message);
      return res.status(500).json({ error: 'Haber silinirken hata oluştu.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Haber bulunamadı.' });
    }
    res.json({ message: 'Haber başarıyla silindi.' });
  });
});

module.exports = router;
