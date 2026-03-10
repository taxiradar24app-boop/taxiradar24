import React, { lazy } from "react";

/* =========================
   LANDING / UPGRADE (LAZY)
========================= */
const AcademiaShop = lazy(() => import("@/Academy/Shop/AcademiaShop"));
const UpgradePage = lazy(() => import("@/Academy/upgrade/UpgradePage"));

/* =========================
   LAYOUT PUBLICO (LAZY)
========================= */
const AcademyPublicLayout = lazy(() =>
  import("@/navigator/layouts/AcademyPublicLayout")
);

/* =========================
   DEMO (LAZY)
========================= */
const AcademiaDemo = lazy(() => import("@/Academy/Demo/AcademiaDemo"));
const AcademiaDemoLayout = lazy(() =>
  import("@/navigator/layouts/AcademiaDemoLayout")
);

import reglamentoDemoRoutes from "./rutasDemo/reglamentoDemoRoutes";
import audiosDemoRoutes from "./rutasDemo/audiosDemoRoutes";
import simuladorDemoRoutes from "./rutasDemo/simuladorDemoRoutes";
import callejeroDemoRoutes from "./rutasDemo/callejeroDemoRoutes";
import viasDemoRoutes from "./rutasDemo/viasDemoRoutes";
import tarifasDemoRoutes from "./rutasDemo/tarifasDemoRoutes";

/* =========================
   PRO (LAZY)
========================= */
const AcademyLayout = lazy(() => import("@/navigator/layouts/AcademyLayout"));
const AcademiaPro = lazy(() => import("@/Academy/Pro/AcademiaPro"));

const ProfileLayout = lazy(() => import("@/Profile/ProfileLayout"));

import reglamentoProRoutes from "./reglamentoRoutes";
import audiosProRoutes from "./audiosRoutes";
import callejeroProRoutes from "./callejeroRoutes";
import simuladorProRoutes from "./simuladorRoutes";
import viasProRoutes from "./viasRoutes";
import tarifasProRoutes from "./tarifasRoutes";

/* =========================
   ROUTES
========================= */

const academyRoutes = [
  {
    path: "academia",
    element: <AcademyPublicLayout />,
    children: [{ index: true, element: <AcademiaShop /> }],
  },
  {
    path: "academia/demo",
    element: <AcademiaDemoLayout />,
    children: [
      { index: true, element: <AcademiaDemo /> },
      ...reglamentoDemoRoutes,
      ...audiosDemoRoutes,
      ...simuladorDemoRoutes,
      ...callejeroDemoRoutes,
      ...viasDemoRoutes,
      ...tarifasDemoRoutes,
    ],
  },
  {
    path: "perfil",
    element: <ProfileLayout />,
  },
  {
    path: "academia/pro",
    protected: true,
    element: <AcademyLayout />,
    children: [
      { index: true, element: <AcademiaPro /> },
      ...reglamentoProRoutes,
      ...audiosProRoutes,
      ...callejeroProRoutes,
      ...simuladorProRoutes,
      ...viasProRoutes,
      ...tarifasProRoutes,
    ],
  },
  {
    path: "academia/upgrade",
    element: <UpgradePage />,
  },
];

export default academyRoutes;