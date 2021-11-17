import styled from 'styled-components';
import UserList from './UserList';
import UserInfoPanel from './UserInfoPanel';

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
// Overall user component. List all users on right, and selected user details on left.
function UserContainer() {
  return (
    <StyledOuterContainer>
      <StyledListContainer>
        <UserList />
      </StyledListContainer>
      <StyledDetailsContainer>
        <UserInfoPanel />
      </StyledDetailsContainer>
    </StyledOuterContainer>
  );
}

export default UserContainer;
