require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routes import 

const authorsRoutes = require('./routes/authorsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const newsRoutes = require('./routes/newsRoutes');
const financeRoutes = require('./routes/financeRoutes');
const sliderRoutes = require('./routes/sliderRoutes');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());               // Cross-Origin izinleri
app.use(express.json());       // JSON body parser

// API Routes 

app.use('/api/authors', authorsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/slider-news', sliderRoutes);

// Basit test endpoint
app.get('/', (req, res) => {
  res.send('Express + SQLite3 API çalışıyor!');
});

// Server başlatma
app.listen(PORT, () => {
  console.log(`Server port ${PORT} üzerinde çalışıyor.`);
});
