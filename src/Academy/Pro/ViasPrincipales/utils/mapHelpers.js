import centrosOficiales from "./../data/centrosOficiales";
import centrosCulturales from "./../data/centrosCulturales";
import centrosSalud from "./../data/centrosSalud";
import centrosEducativos from "./../data/centrosEducativos";
import hoteles from "./../data/hoteles";
import polideportivos from "./../data/polideportivos";
import hosteleria from "./../data/hosteleria";
import monumentos from "./../data/monumentos";

export const getCategoryData = (category) => {
  switch (category) {
    case "vias":
      return [];
    case "oficiales":
      return centrosOficiales.items;
    case "culturales":
      return centrosCulturales.items;
    case "salud":
      return centrosSalud.items;
    case "educativos":
      return centrosEducativos.items;
    case "hoteles":
      return hoteles.items;
    case "deportivos":
      return polideportivos.items;
    case "hosteleria":
      return hosteleria.items;
    case "monumentos":
      return monumentos.items;
    default:
      return [];
  }
};