import styled from "styled-components";

export const BannerWrapper = styled.div`
  width: 100%;
  padding: 0.75rem 1.2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  background: rgba(10, 15, 30, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-bottom: 1px solid rgba(0, 255, 200, 0.25);
  box-shadow: 0 6px 22px rgba(0, 255, 200, 0.07);

  font-size: 0.9rem;
  color: ${({ theme }) => theme?.colors?.textPrimary || "#e2e8f0"};

  position: sticky;
  top: 0;
  z-index: 1000; /* siempre encima */
`;

export const BannerCTA = styled.button`
  padding: 0.45rem 1rem;
  border-radius: 8px;

  background: ${({ theme }) => theme?.colors?.headerActiveBg || "#10b981"};
  color: #ffffff;

  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;

  transition: 0.15s ease-in-out;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;
