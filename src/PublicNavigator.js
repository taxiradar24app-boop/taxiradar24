// src/navigator/PublicNavigator.js

import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./navigator/layouts/PublicLayout";
import {
  PrivacyPage,
  CookiesPage,
  TermsPage,
  PaymentsSubscriptionsPage,
  LegalNoticePage,
} from "@/PrivacyPolicies";

const HomeScreen = React.lazy(() => import("@/Screens/HomeScreen"));

function Loader() {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      Cargando…
    </div>
  );
}

export default function PublicNavigator() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicLayout />}>

          {/* HOME */}
          <Route index element={<HomeScreen />} />

          {/* SEO PAGES */}
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/pagos-y-suscripciones" element={<PaymentsSubscriptionsPage />} />
          <Route path="/aviso-legal" element={<LegalNoticePage />} />

        </Route>
      </Routes>
    </Suspense>
  );
}