import { useState } from 'react';
import styled from 'styled-components';
import { User, Role } from '@my-garage/common';
import UserList from './UserList';
import UserDetails from './UserDetails';

const OuterContainer = styled.div`
  display: flex;
  background-color: white;
  margin: 34px;
  width: 100%;
  border-radius: 2px;
  box-shadow: 2px 2px 15px 2px rgba(9, 41, 110, 0.2);
`;

const ListContainer = styled.div`
  display: flex;
  max-width: 400px;
  width: 40%;
  overflow: auto;
  padding: 0 16px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-grow: 1;

  overflow: auto;
`;

const adminRole: Role = {
  name: 'Admin',
  createdAt: new Date('05/31/2021 14:03:28'),
};

const defaultUser: User = {
  fullName: ' ',
  email: '',
  role: adminRole,
  createdAt: new Date('05/31/2021 14:03:28'),
};

function UserContainer() {
  const [clickedUser, setClickedUser] = useState<User>(defaultUser);

  const getClickedUser = (value: User) => {
    setClickedUser(value);
  };

  return (
    <OuterContainer>
      <ListContainer>
        <UserList onClick={getClickedUser} />
      </ListContainer>
      <DetailsContainer>
        <UserDetails userDetail={clickedUser} />
      </DetailsContainer>
    </OuterContainer>
  );
}

export default UserContainer;
