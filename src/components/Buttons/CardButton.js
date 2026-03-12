import styled from "styled-components";

const CardButton = styled.button`
  width: 100%;
  padding: 0.95rem 1.3rem;

  border-radius: 14px;
  border: none;
  cursor: pointer;

  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: 0.02em;

  color: #052e16;

  background: linear-gradient(
    135deg,
    #22c55e 0%,
    #4ade80 45%,
    #86efac 100%
  );

  box-shadow:
    0 6px 18px rgba(34, 197, 94, 0.25),
    inset 0 1px 0 rgba(255,255,255,0.35);

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;

  &:hover {
    transform: translateY(-2px);

    filter: brightness(1.05);

    box-shadow:
      0 10px 24px rgba(34, 197, 94, 0.35),
      inset 0 1px 0 rgba(255,255,255,0.45);
  }

  &:active {
    transform: translateY(0) scale(0.97);

    box-shadow:
      0 4px 12px rgba(34, 197, 94, 0.25),
      inset 0 1px 0 rgba(255,255,255,0.35);
  }

  &:focus-visible {
    outline: none;

    box-shadow:
      0 0 0 2px rgba(134, 239, 172, 0.9),
      0 6px 18px rgba(34, 197, 94, 0.25);
  }
`;

export default CardButton;