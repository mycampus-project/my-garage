import styled from 'styled-components';
import UserList from './UserList';
import UserInfoPanel from './UserInfoPanel';

const OuterContainer = styled.div`
  display: flex;
  background-color: white;
  margin: 32px;
  width: 100%;
  border-radius: 2px;
`;

const ListContainer = styled.div`
  max-width: 400px;
  min-width: 260px;
  width: 40%;
  overflow: auto;
  padding: 0;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: auto;
`;
// Overall user component. List all users on right, and selected user details on left.
function UserContainer() {
  return (
    <OuterContainer>
      <ListContainer>
        <UserList />
      </ListContainer>
      <DetailsContainer>
        <UserInfoPanel />
      </DetailsContainer>
    </OuterContainer>
  );
}

export default UserContainer;
