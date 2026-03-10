import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";
import { useAuth } from "@/context/AuthContext";

const DemoBanner = styled.div`
  width: 100%;
  background: #0f172a;
  color: #a3e635;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const LayoutWrap = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme?.colors?.background || "#061224"};
`;

const Main = styled.main`
  width: 100%;
`;

export default function AcademiaDemoLayout() {
  const location = useLocation();
  const { subscription, loading, subscriptionLoading } = useAuth();

  const isPro = subscription?.status === "active";

  if (loading || subscriptionLoading) return null;

  // ✅ Usuario PRO no puede permanecer en DEMO
  if (isPro) {
    return <Navigate to="/academia/pro" replace state={{ from: location }} />;
  }

  return (
    <LayoutWrap>
      <DemoBanner>ESTÁS EN LA VERSIÓN DEMO</DemoBanner>
      <HeaderAcademia />
      <Main>
        <Outlet />
      </Main>
    </LayoutWrap>
  );
}