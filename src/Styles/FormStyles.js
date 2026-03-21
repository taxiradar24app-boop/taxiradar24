import styled, { css } from "styled-components";

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 36px 16px;
  background: #0a1528;
  color: #ececf1;
`;

export const AuthCard = styled.div`
  width: min(560px, 94vw);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 26px 18px 18px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.35);
`;

export const LogoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`;

export const LogoImage = styled.img`
  display: block;
  width: clamp(110px, 14vw, 160px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.22));
`;

export const AuthTitle = styled.h1`
  margin: 0 0 8px 0;
  text-align: center;
  color: #f4d35e;

  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes.hero});
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  line-height: 1.04;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};
`;

export const AuthSubtitle = styled.p`
  max-width: 440px;
  margin: 0 auto 18px;
  text-align: center;
  color: #d7e3f4;

  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;

  background: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 58px;
  padding: 0 18px;

  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(15, 23, 42, 0.84);
  color: #f8fafc;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: #9fb1c8;
    opacity: 0.82;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  &:focus {
    outline: none;
    border-color: rgba(244, 211, 94, 0.72);
    box-shadow: 0 0 0 4px rgba(244, 211, 94, 0.12);
    background: rgba(15, 23, 42, 0.96);
  }
`;

export const Button = styled.button`
  width: 100%;
  min-height: 58px;
  border: none;
  border-radius: 16px;
  padding: 14px 18px;

  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  cursor: pointer;

  transition:
    transform 0.14s ease,
    background 0.22s ease,
    color 0.22s ease,
    box-shadow 0.22s ease,
    filter 0.22s ease;

  background: linear-gradient(135deg, #10a37f 0%, #6acb45 100%);
  color: #081325;
  box-shadow: 0 16px 34px rgba(74, 222, 128, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 36px rgba(74, 222, 128, 0.24);
    filter: brightness(1.03);
  }

  &:active {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.68;
    cursor: not-allowed;
    transform: none;
    filter: grayscale(0.1);
  }

${({ $variant }) =>
  $variant === "danger" &&
  css`
    background: rgba(255, 255, 255, 0.04);
    font-weight: 500;
    color: #cbd5e1;

    border: 1px solid rgba(148, 163, 184, 0.18);

    box-shadow: none;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(148, 163, 184, 0.28);
      color: #e2e8f0;
    }
  `}
`;

export const TextLink = styled.span`
  color: #59a8ff;

  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  cursor: pointer;
  text-align: center;
  margin-top: 6px;

  transition: color 0.2s ease, opacity 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #8dc5ff;
  }
`;

export const AuthMessage = styled.div`
  width: 100%;
  border-radius: 14px;
  padding: 12px 14px;
  text-align: center;
  white-space: pre-line;

  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  ${({ type }) =>
    type === "success"
      ? css`
          background: rgba(16, 163, 127, 0.14);
          border: 1px solid rgba(16, 163, 127, 0.28);
          color: #9ff3d8;
        `
      : css`
          background: rgba(239, 93, 108, 0.14);
          border: 1px solid rgba(239, 93, 108, 0.28);
          color: #ffd7dc;
        `}
`;

export const RecaptchaWrap = styled.div`
  width: 100%;
  max-width: 440px;
  margin: 12px auto 0;
`;
export const PhoneField = styled.div`
  width: 100%;
  min-height: 58px;
  display: flex;
  align-items: center;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(15, 23, 42, 0.84);
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:focus-within {
    border-color: rgba(244, 211, 94, 0.72);
    box-shadow: 0 0 0 4px rgba(244, 211, 94, 0.12);
    background: rgba(15, 23, 42, 0.96);
  }
`;

export const PhonePrefix = styled.div`
  min-width: 76px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  color: #d7e3f4;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-right: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(255, 255, 255, 0.02);
`;

export const PhoneInput = styled.input`
  flex: 1;
  min-height: 58px;
  padding: 0 18px;
  border: none;
  outline: none;
  background: transparent;
  color: #f8fafc;

  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  &::placeholder {
    color: #9fb1c8;
    opacity: 0.82;
  }
`;