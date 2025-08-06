export const requestOpenSkyToken = async () => {
  try {
    const response = await fetch('https://opensky-proxy.onrender.com/token', {
      headers: {
        Authorization: 'Bearer tusecretoseguro123'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errText}`);
    }

    const json = await response.json();
    return {
      token: json.access_token,
      expiresIn: json.expires_in
    };
  } catch (err) {
    console.error('❌ Error al pedir token desde el proxy:', err);
    return null;
  }
};
