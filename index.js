const mysql = require("mysql");
const express = require('express');
const app = express();
const port = 9000; // Sunucu portu, ihtiyaca göre değiştirilebilir

// MySQL bağlantı bilgilerini ayarlayın
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "deneme",
});

// MySQL veritabanına bağlanın
connection.connect((err) => {
  if (err) {
    console.error("Veritabanına bağlanırken hata oluştu: " + err.stack);
    return;
  }
  console.log("Veritabanına başarıyla bağlandı.");
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM veriler LIMIT 100000', (err, rows) => {
    if (err) {
      console.error('Sorgu hatası: ' + err.stack);
      return;
    }

    res.json(rows); // Verileri JSON olarak gönderin
  });
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
