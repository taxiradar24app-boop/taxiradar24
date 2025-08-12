// server.js – OpenSky proxy (Express)
// .env esperado:
// OSK_CLIENT_ID=...            (requerido)
// OSK_CLIENT_SECRET=...        (requerido)
// PROXY_SECRET=tusecretoseguro123   (opcional; si está, se exige header x-proxy-secret)
// ALLOW_ORIGIN=https://taxitip.org,http://localhost:3000
// PORT= (Render lo inyecta)

require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // v2
const cors = require('cors');

const app = express();
app.use(express.json());

// ---------- CORS por lista ----------
const allowed = (process.env.ALLOW_ORIGIN || '*')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Permite curl/SSR (sin Origin) y '*' o coincidencia exacta
    if (!origin || allowed.includes('*') || allowed.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`));
  },
}));

// ---------- Credenciales ----------
const OSK_CLIENT_ID = process.env.OSK_CLIENT_ID;
const OSK_CLIENT_SECRET = process.env.OSK_CLIENT_SECRET;
const PROXY_SECRET = process.env.PROXY_SECRET || null;

if (!OSK_CLIENT_ID || !OSK_CLIENT_SECRET) {
  console.error('❌ Faltan OSK_CLIENT_ID / OSK_CLIENT_SECRET en .env');
}

// ---------- Protección opcional ----------
function requireProxySecret(req, res, next) {
  if (!PROXY_SECRET) return next(); // sin secreto -> libre (útil dev)
  const header = req.get('x-proxy-secret');
  if (header === PROXY_SECRET) return next();
  return res.status(401).json({ error: 'unauthorized', message: 'x-proxy-secret missing/invalid' });
}

// ---------- Caché de token ----------
let tokenCache = { access_token: null, expires_at: 0 };

async function getOpenSkyToken() {
  const now = Math.floor(Date.now() / 1000);
  if (tokenCache.access_token && tokenCache.expires_at - 60 > now) {
    return tokenCache.access_token;
  }

  const url = 'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: OSK_CLIENT_ID,
      client_secret: OSK_CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token error ${res.status}: ${body}`);
  }

  const data = await res.json();
  tokenCache.access_token = data.access_token;
  tokenCache.expires_at = Math.floor(Date.now() / 1000) + (data.expires_in || 1800);
  return tokenCache.access_token;
}

// ---------- Health ----------
app.get('/', (_req, res) => res.json({ ok: true, service: 'taxitip-opensky-proxy' }));

// ---------- Endpoint estados ----------
app.get('/opensky/states', requireProxySecret, async (req, res) => {
  try {
    const token = await getOpenSkyToken();

    // Sanitizar QS
    const allowParams = ['lamin', 'lomin', 'lamax', 'lomax', 'time', 'icao24', 'extended'];
    const qs = new URLSearchParams();
    for (const k of allowParams) if (req.query[k] !== undefined) qs.set(k, req.query[k]);

    // Si no pasan bbox, usa Palma (LEPA) por defecto
    if (![qs.get('lamin'), qs.get('lomin'), qs.get('lamax'), qs.get('lomax')].every(Boolean)) {
      qs.set('lamin', '39.48');
      qs.set('lomin', '2.60');
      qs.set('lamax', '39.78');
      qs.set('lomax', '2.90');
    }

    const upstream = `https://opensky-network.org/api/states/all?${qs.toString()}`;
    const r = await fetch(upstream, { headers: { Authorization: `Bearer ${token}` } });

    const text = await r.text(); // devolvemos tal cual
    res.status(r.status).type('application/json').send(text);
  } catch (err) {
    console.error('Proxy /opensky/states error:', err.message);
    res.status(500).json({ error: 'proxy_error', message: err.message });
  }
});

// ---------- Start ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OpenSky proxy up on :${PORT}`);
});
