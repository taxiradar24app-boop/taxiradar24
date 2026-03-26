import React, { useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

const MAP_HEIGHT = "420px";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapController({ center, zoom }) {
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
}

export default function LeafletMapInner({
  center,
  zoom,
  category,
  visibleData,
  onMarkerClick,
}) {
  const markers = useMemo(
    () =>
      (visibleData || []).filter(
        (item) =>
          Array.isArray(item.coordinates) && item.coordinates.length === 2
      ),
    [visibleData]
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: MAP_HEIGHT, width: "100%" }}
      scrollWheelZoom
    >
      <MapController center={center} zoom={zoom} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((item) => (
        <Marker
          key={item.id}
          position={item.coordinates}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onMarkerClick?.(item, category),
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
}