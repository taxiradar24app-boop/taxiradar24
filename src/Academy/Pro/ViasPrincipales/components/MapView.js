import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getCategoryData } from "../utils/mapHelpers";

// ==============================
// ICONO GENÉRICO
// ==============================
const defaultIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ==============================
// CONTROLADOR DE MOVIMIENTO
// ==============================
const MapController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (Array.isArray(center) && center.length === 2) {
      map.flyTo(center, zoom, {
        duration: 0.8,
        easeLinearity: 0.25,
      });
    }
  }, [center, zoom, map]);

  return null;
};

// ==============================
// MAP VIEW
// ==============================
const MapView = ({ center, zoom, category, activeItem, onMarkerClick }) => {
  const data = Array.isArray(getCategoryData(category))
    ? getCategoryData(category)
    : [];

  // 🔑 SOLO MOSTRAR EL ICONO SELECCIONADO
  const visibleData = activeItem
    ? data.filter((item) => item.id === activeItem)
    : data;

  const safeCenter = Array.isArray(center) ? center : [39.5696, 2.6502];
  const safeZoom = typeof zoom === "number" ? zoom : 13;

  return (
    <MapContainer
      center={safeCenter}
      zoom={safeZoom}
      style={{ height: "420px", width: "100%" }}
      scrollWheelZoom
    >
      <MapController center={safeCenter} zoom={safeZoom} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {visibleData
        .filter(
          (item) =>
            Array.isArray(item.coordinates) &&
            item.coordinates.length === 2
        )
        .map((item) => (
          <Marker
            key={item.id}
            position={item.coordinates}
            icon={defaultIcon}
            eventHandlers={{
              click: () => onMarkerClick(item, category),
            }}
          >
            <Popup>
              <strong>{item.label}</strong>
              {item.via && <div>{item.via}</div>}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapView;
