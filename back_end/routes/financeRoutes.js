const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

// GET: Tüm finans verilerini getir
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM finance_data ORDER BY id';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Finance verisi getirme hatası:', err.message);
      return res.status(500).json({ error: 'Finance verisi getirilirken hata oluştu.' });
    }
    res.json(rows);
  });
});

// POST: Yeni finans verisi ekle
router.post('/', (req, res) => {
  const { label, value, change_val, percent, direction } = req.body;

  if (!label || !value) {
    return res.status(400).json({ error: 'label ve value zorunludur.' });
  }

  const sql = 'INSERT INTO finance_data (label, value, change_val, percent, direction) VALUES (?, ?, ?, ?, ?)';
  const params = [
    label,
    value,
    change_val || '',
    percent || '',
    direction || ''
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Finance verisi ekleme hatası:', err.message);
      return res.status(500).json({ error: 'Finance verisi eklenirken hata oluştu.' });
    }
    res.status(201).json({ message: 'Finance verisi başarıyla eklendi.', id: this.lastID });
  });
});

// DELETE: Finance verisini id ile sil
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM finance_data WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Finance verisi silme hatası:', err.message);
      return res.status(500).json({ error: 'Finance verisi silinirken hata oluştu.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Finance verisi bulunamadı.' });
    }
    res.json({ message: 'Finance verisi başarıyla silindi.' });
  });
});

module.exports = router;
