import React from "react";
import {
  PageWrapper,
  PageFrame,
  MapWrapper,
  ContentGrid,
  ListColumn,
  SidebarColumn,
  SectionTitle,
  DirectionsList,
  DirectionItem,
  SidebarTitle,
  SidebarItem,
} from "./ViasPrincipalesStyle";


import MapView from "./components/MapView";
import useViasMap from "./hooks/useViasMap";
import { getCategoryData } from "./utils/mapHelpers";

const CATEGORIES = [
  { id: "oficiales", label: "Centros oficiales" },
  { id: "culturales", label: "Centros culturales" },
  { id: "salud", label: "Centros de salud" },
  { id: "educativos", label: "Centros educativos" },
  { id: "hoteles", label: "Hoteles" },
  { id: "deportivos", label: "Centros deportivos" },
  { id: "hosteleria", label: "Hostelería" },
  { id: "monumentos", label: "Monumentos y lugares clave" },
];

const ViasPrincipalesScreen = () => {
  const {
    activeCategory,
    setActiveCategory,
    activeItem,
    mapCenter,
    mapZoom,
    focusOnItem,
  } = useViasMap();

  const data = getCategoryData(activeCategory);

  return (
    <PageWrapper>

      <PageFrame>

        {/* MAPA */}
        <MapWrapper>
          <MapView
            center={mapCenter}
            zoom={mapZoom}
            category={activeCategory}
            activeItem={activeItem}
            onMarkerClick={focusOnItem}
          />
        </MapWrapper>

        {/* CONTENIDO */}
        <ContentGrid>
          <ListColumn>
            <SectionTitle>
              {CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </SectionTitle>

            <DirectionsList>
              {data.map((item) => (
                <DirectionItem
                  key={item.id}
                  onClick={() => focusOnItem(item, activeCategory)}
                >
                  {item.label}
                </DirectionItem>
              ))}
            </DirectionsList>
          </ListColumn>

          <SidebarColumn>
            <SidebarTitle>Contenidos</SidebarTitle>

            {CATEGORIES.map((cat) => (
              <SidebarItem
                key={cat.id}
                $active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </SidebarItem>
            ))}
          </SidebarColumn>
        </ContentGrid>
      </PageFrame>
    </PageWrapper>
  );
};

export default ViasPrincipalesScreen;
