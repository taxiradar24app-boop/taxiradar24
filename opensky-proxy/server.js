// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Endpoint para pedir token a OpenSky
app.post('/token', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const expectedSecret = `Bearer ${process.env.PROXY_AUTH_SECRET}`;

    if (!authorization || authorization !== expectedSecret) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const tokenRes = await fetch('https://opensky-network.org/api/v2/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.OPEN_SKY_CLIENT_ID,
        client_secret: process.env.OPEN_SKY_CLIENT_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      throw new Error(`Error al obtener token: ${tokenRes.status} - ${errText}`);
    }

    const tokenData = await tokenRes.json();
    res.json({
      access_token: tokenData.access_token,
      expires_in: tokenData.expires_in,
    });
  } catch (err) {
    console.error('❌ Error en /token:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para obtener vuelos filtrados cerca de Palma (LEPA)
app.get('/flights', async (req, res) => {
  try {
    // Primero obtenemos el token OAuth2 de OpenSky
    const tokenRes = await fetch('https://opensky-network.org/api/v2/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.OPEN_SKY_CLIENT_ID,
        client_secret: process.env.OPEN_SKY_CLIENT_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      throw new Error(`Error al obtener token para /flights: ${tokenRes.status} - ${errText}`);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Llamada a OpenSky para obtener estados de vuelos
    const response = await fetch('https://opensky-network.org/api/states/all', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const filteredStates = (data.states || []).filter((flight) => {
      const lat = flight[6];
      const lon = flight[5];
      const alt = flight[13];
      const vert = flight[11];
      return (
        lat && lon && alt != null && vert != null &&
        Math.abs(lat - 39.5517) < 1.0 &&
        Math.abs(lon - 2.7388) < 1.0 &&
        alt < 4000 &&
        vert < 0
      );
    });

    res.json({ time: data.time, states: filteredStates });
  } catch (error) {
    console.error('❌ Error en /flights:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy OpenSky escuchando en puerto ${PORT}`);
});
