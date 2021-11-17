import styled from 'styled-components';

const StyledOuterContainer = styled.div`
  display: flex;
  background-color: white;
  margin: 32px;
  width: 100%;
  border-radius: 2px;
`;

const StyledListContainer = styled.div`
  max-width: 400px;
  min-width: 260px;
  width: 40%;
  overflow: auto;
  padding: 0;
`;

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: auto;
`;

interface MainContainerProps {
  list: JSX.Element;
  details: JSX.Element;
}

// Overall user component. List all users on right, and selected user details on left.
function MainContainer({ list, details }: MainContainerProps) {
  return (
    <StyledOuterContainer>
      <StyledListContainer>{list}</StyledListContainer>
      <StyledDetailsContainer>{details}</StyledDetailsContainer>
    </StyledOuterContainer>
  );
}

export default MainContainer;
