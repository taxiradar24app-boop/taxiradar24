// ======================================================================
// 📘 articulosIndex.js — VERSIÓN CORRECTA (sin duplicados)
// ======================================================================

import art_1_3 from "./art_1_3";
import art_4_9 from "./art_4_9";
import art_10_15 from "./art_10_15";
import art_16 from "./art_16";
import art_17_20 from "./art_17_20";
import art_21_25 from "./art_21_25";
import art_26_27 from "./art_26_27";
import art_28_32 from "./art_28_32";
import art_33_45 from "./art_33_45";
import art_46 from "./art_46";
import art_47_65 from "./art_47_65";
import art_66_68 from "./art_66_68";
import art_69_74 from "./art_69_74";
import art_77_81 from "./art_77_81";
import art_82 from "./art_82";

const articulosById = {
  [art_1_3.id]: art_1_3,
  [art_4_9.id]: art_4_9,
  [art_10_15.id]: art_10_15,
  [art_16.id]: art_16,
  [art_17_20.id]: art_17_20,
  [art_21_25.id]: art_21_25,
  [art_26_27.id]: art_26_27,
  [art_28_32.id]: art_28_32,
  [art_33_45.id]: art_33_45,
  [art_46.id]: art_46,
  [art_47_65.id]: art_47_65,
  [art_66_68.id]: art_66_68,
  [art_69_74.id]: art_69_74,
  [art_77_81.id]: art_77_81,
  [art_82.id]: art_82,
};

// ← ESTE ES EL ARRAY LIMPIO QUE NECESITA REGLAMENTOMENU
const articulosIndex = Object.values(articulosById);

export default articulosIndex;
