// opensky-proxy/server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// En Render no hace falta dotenv, pero no molesta en local
try { require('dotenv').config(); } catch (_) {}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Healthcheck (para probar en el navegador)
app.get('/health', (_, res) => res.status(200).send('ok'));

// === /token: devuelve token OAuth2 de OpenSky, protegido por secreto ===
app.post('/token', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const expectedSecret = `Bearer ${process.env.PROXY_AUTH_SECRET}`;
    if (!authorization || authorization !== expectedSecret) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const tokenRes = await fetch('https://opensky-network.org/api/v2/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        // OJO: nombres de variables correctos
        client_id: process.env.OPENSKY_CLIENT_ID,
        client_secret: process.env.OPENSKY_CLIENT_SECRET,
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

// === /flights: obtiene estados y filtra cercanos a Palma (LEPA) ===
app.get('/flights', async (_req, res) => {
  try {
    // 1) Obtener token
    const tokenRes = await fetch('https://opensky-network.org/api/v2/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.OPENSKY_CLIENT_ID,
        client_secret: process.env.OPENSKY_CLIENT_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      throw new Error(`Error al obtener token para /flights: ${tokenRes.status} - ${errText}`);
    }
    const { access_token } = await tokenRes.json();

    // 2) Llamar a states/all con Bearer
    const response = await fetch('https://opensky-network.org/api/states/all', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errText}`);
    }

    const data = await response.json();

    // 3) Filtrar cercanos a Palma
    const filteredStates = (data.states || []).filter((f) => {
      const callsign = f[1];
      const lon = f[5];
      const lat = f[6];
      const baroAlt = f[7];     // baro altitude
      const vertRate = f[11];   // vertical rate m/s

      return (
        lat != null && lon != null &&
        Math.abs(lat - 39.5517) < 1.0 &&
        Math.abs(lon - 2.7388) < 1.0 &&
        baroAlt != null && baroAlt < 4000 &&   // por debajo de 4000m
        vertRate != null && vertRate < 0       // descendiendo
      );
    });

    res.json({ time: data.time, states: filteredStates });
  } catch (error) {
    console.error('❌ Error en /flights:', error);
    res.status(500).json({ error: error.message });
  }
});

// (una sola vez)
app.listen(PORT, () => {
  console.log(`🚀 Proxy OpenSky escuchando en puerto ${PORT}`);
});
