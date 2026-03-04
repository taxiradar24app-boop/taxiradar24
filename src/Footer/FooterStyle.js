// src/Styles/FooterStyle/FooterStyle.js
import styled from "styled-components";

export const Form = styled.div`
  background-color: #343541;
  color: #f1f1f1;
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  margin: 2rem auto;
  line-height: 1.6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  h1 {
    color: #f4d35e;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  h2 {
    color: #f4d35e;
    margin-top: 1.2rem;
  }

  ul {
    margin-left: 1.5rem;
  }

  label {
    display: block;
    margin-top: 1rem;
    color: #fff;
  }

  input, textarea {
    width: 100%;
    padding: 0.7rem;
    border-radius: 8px;
    border: none;
    margin-top: 0.4rem;
    background-color: #222;
    color: #fff;
  }

  button {
    margin-top: 1.5rem;
    background-color: #f4d35e;
    color: #000;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s ease-in-out;
  }

  button:hover {
    background-color: #fff176;
  }
`;
