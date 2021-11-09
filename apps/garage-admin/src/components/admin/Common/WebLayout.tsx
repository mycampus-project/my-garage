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

const ScrollContainer = styled.div`
  width: 70%;
  height: 70%;
  overflow: auto;
  padding: 0 16px;
  border: 1px solid lightgrey;
  -webkit-box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10vh;
`;

const BoxContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

interface UserLayoutProps {
  Title: JSX.Element | JSX.Element[];
  List: JSX.Element | JSX.Element[];
  Details: JSX.Element | JSX.Element[];
}

function WebLayout({ Title, List, Details }: UserLayoutProps) {
  return (
    <VerticalContainer>
      <TitleContainer>{Title}</TitleContainer>
      <HorizontalContainer>
        <BoxContainer>
          <ScrollContainer>{List}</ScrollContainer>
        </BoxContainer>
        <BoxContainer>{Details}</BoxContainer>
      </HorizontalContainer>
    </VerticalContainer>
  );
}

export default WebLayout;
