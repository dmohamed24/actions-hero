// src/index.js
const express = require('express');
require('dotenv').config();
const app = express();
const fetch = require('node-fetch');

// Data endpoint
app.get('/data', (req, res) => {
  const randomData = { number: Math.floor(Math.random() * 100) };
  res.json(randomData);
});

// Webpage endpoint
app.get('/', async (req, res) => {
  try {
    const response = await fetch(
      `http://localhost:${process.env.PORT || 3000}/data`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    res.send(`
      <html>
        <head><title>Random Number</title></head>
        <body>
          <h1>Here is a random number: ${data.number}</h1>
          <p>Refresh to see a new one.</p>
          <button onClick="window.location.reload();">Refresh Page</button>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`Error fetching data ${error}`);
  }
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = { app, server };
