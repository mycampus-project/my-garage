import styled from 'styled-components';

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90vh;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10vh;
`;

interface UserLayoutProps {
  Title: JSX.Element | JSX.Element[];
  Element: JSX.Element | JSX.Element[];
}

function WebLayout({ Title, Element }: UserLayoutProps) {
  return (
    <VerticalContainer>
      <TitleContainer>{Title}</TitleContainer>
      <HorizontalContainer>{Element}</HorizontalContainer>
    </VerticalContainer>
  );
}

export default WebLayout;
