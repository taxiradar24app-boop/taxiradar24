import styled from "styled-components";

const BannerCTAButton = styled.button`
  padding: 0.4rem 1.1rem;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.headerActiveBg || "#10b981"};
  color: #ffffff;

  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;

  transition: 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }
`;

export default BannerCTAButton;
