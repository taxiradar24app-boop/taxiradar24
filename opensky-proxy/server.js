// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint protegido
app.get('/token', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const expectedToken = `Bearer ${process.env.PROXY_SECRET}`;

  if (!authHeader || authHeader !== expectedToken) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  const clientId = process.env.OPENSKY_CLIENT_ID;
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Credenciales no configuradas' });
  }

  try {
    const response = await fetch('https://opensky-network.org/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data); // { access_token, expires_in }
  } catch (err) {
    console.error('Error al solicitar token:', err);
    res.status(500).json({ error: 'Error interno al solicitar token' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor proxy escuchando en puerto ${PORT}`);
});
