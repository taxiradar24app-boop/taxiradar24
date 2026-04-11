import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";
import { useAuth } from "@/context/AuthContext";

const LayoutWrap = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme?.colors?.background || "#061224"};
`;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 40px;
`;

const LoaderWrap = styled.div`
  min-height: 60vh;
  display: grid;
  place-items: center;
  color: #ffffff;
`;

export default function AcademiaDemoLayout() {
  const location = useLocation();
  const { subscription, loading, subscriptionLoading } = useAuth();

  const isPro = subscription?.active === true;

  if (loading || subscriptionLoading) {
    return (
      <LayoutWrap>
        <HeaderAcademia withSafeTop />
        <LoaderWrap>Cargando…</LoaderWrap>
      </LayoutWrap>
    );
  }

  if (isPro) {
    return <Navigate to="/academia/pro" replace state={{ from: location }} />;
  }

  return (
    <LayoutWrap>
      <HeaderAcademia withSafeTop />
      <Main>
        <Outlet />
      </Main>
    </LayoutWrap>
  );
}