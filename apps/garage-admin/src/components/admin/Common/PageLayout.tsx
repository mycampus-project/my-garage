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
  justify-content: center;
  align-content: center;
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10vh;
`;

interface UserLayoutProps {
  Title: JSX.Element | JSX.Element[];
  Element: JSX.Element | JSX.Element[];
}

function PageLayout({ Title, Element }: UserLayoutProps) {
  return (
    <VerticalContainer>
      <BannerContainer>{Title}</BannerContainer>
      <HorizontalContainer>{Element}</HorizontalContainer>
    </VerticalContainer>
  );
}

export default PageLayout;
