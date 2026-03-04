// src/Academy/Pro/ViasPrincipales/hooks/useViasMap.js

import { useEffect, useState } from "react";

const STORAGE_KEY = "viasMap:lastPoint";

const DEFAULT_CENTER = [39.5696, 2.6502];
const DEFAULT_ZOOM = 13;
const FOCUS_ZOOM = 16;

export const useViasMap = () => {
  const [activeCategory, setActiveCategory] = useState("vias");
  const [activeItem, setActiveItem] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

  // 🔁 Cargar último estado del mapa
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (
        Array.isArray(parsed.center) &&
        parsed.center.length === 2 &&
        Number.isFinite(parsed.zoom)
      ) {
        setActiveCategory(parsed.category || "vias");
        setActiveItem(parsed.itemId || null);
        setMapCenter(parsed.center);
        setMapZoom(parsed.zoom);
      }
    } catch {
      console.warn("No se pudo restaurar el estado del mapa");
    }
  }, []);

  // 📍 Enfocar punto + persistir
  const focusOnItem = (item, category) => {
    if (!item?.coordinates) return;

    const payload = {
      category,
      itemId: item.id,
      center: item.coordinates,
      zoom: FOCUS_ZOOM,
    };

    setActiveCategory(category);
    setActiveItem(item.id);
    setMapCenter(item.coordinates);
    setMapZoom(FOCUS_ZOOM);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  return {
    activeCategory,
    setActiveCategory,
    activeItem,
    mapCenter,
    mapZoom,
    focusOnItem,
  };
};
export default useViasMap;