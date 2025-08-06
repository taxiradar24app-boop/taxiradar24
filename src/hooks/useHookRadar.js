// src/hooks/useHookRadar.js
import { useEffect, useState } from 'react';
import { getAuthToken } from './../services/apiClient';

export const useFlights = () => {
  const [arrival, setArrival] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearbyFlights();
    const interval = setInterval(fetchNearbyFlights, 15 * 60 * 1000); // cada 15 min
    return () => clearInterval(interval);
  }, []);

  const fetchNearbyFlights = async () => {
    try {
      setLoading(true);

      const token = await getAuthToken();
      if (!token) throw new Error('Token de OpenSky no disponible');

      const res = await fetch('https://opensky-network.org/api/states/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      const json = await res.json();
      const now = new Date();

      const flights = (json.states || []).filter((f) => {
        const lat = f[6];
        const lon = f[5];
        const alt = f[13];
        const vert = f[11];

        return (
          lat && lon && alt != null && vert != null &&
          Math.abs(lat - 39.5517) < 1.0 &&
          Math.abs(lon - 2.7388) < 1.0 &&
          alt < 4000 &&
          vert < 0
        );
      });

      const hour = now.getHours();
      const label = `${hour.toString().padStart(2, '0')}:00 - ${((hour + 1) % 24).toString().padStart(2, '0')}:00`;

      setArrival({ hour: label, flights: flights.length, data: flights });
    } catch (err) {
      console.error('❌ Error obteniendo vuelos:', err);
      setArrival({ hour: 'Error', flights: 0, data: [] });
    } finally {
      setLoading(false);
    }
  };

  return { arrival, loading, refetch: fetchNearbyFlights };
};
