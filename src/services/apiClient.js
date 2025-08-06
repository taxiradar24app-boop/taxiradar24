// src/services/apiClient.js
import { requestOpenSkyToken } from './getOpenSkyToken';

let accessToken = null;
let tokenExpiration = null; // Timestamp en milisegundos

export const getAuthToken = async () => {
  const now = Date.now();

  // Si el token existe y no ha expirado, devuélvelo
  if (accessToken && tokenExpiration && now < tokenExpiration) {
    return accessToken;
  }

  // Si no hay token o está vencido, pide uno nuevo
  const result = await requestOpenSkyToken();
  if (!result || !result.token) return null;

  accessToken = result.token;
  tokenExpiration = now + result.expiresIn * 1000 - 5000; // margen de 5s

  return accessToken;
};
