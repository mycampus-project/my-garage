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

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px var(--ant-primary-2);
  }
`;

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-grow: 1;
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
