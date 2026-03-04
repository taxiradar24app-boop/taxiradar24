import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.pro.pageBg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Main = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 32px 20px 80px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.pro.text};
  font-size: 2rem;
  margin-bottom: 24px;
  font-weight: 800;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.greenLight};
  margin-bottom: 12px;
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.pro.textSoft};
  line-height: 1.7;
  font-size: 1.05rem;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.pro.border};
  margin: 40px 0;
`;

export const LockBox = styled.div`
  margin-top: 48px;
  padding: 22px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.pro.card};
  border: 1px solid ${({ theme }) => theme.pro.border};
  text-align: center;
  color: ${({ theme }) => theme.pro.text};

  span {
    display: inline-block;
    margin-top: 12px;
    color: ${({ theme }) => theme.colors.greenLight};
    cursor: pointer;
    font-weight: 700;
  }
`;
