import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// IMPORTACIÓN CORRECTA (DEFAULT)
import IconButton from "./IconButton";

const Arrow = styled.span`
  font-size: 1.4rem;
  line-height: 1;
  color: #e2e8f0;
`;

export default function BackButton({ to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <IconButton onClick={handleClick} aria-label="Volver">
      <Arrow>←</Arrow>
    </IconButton>
  );
}
