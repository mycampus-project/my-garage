import { useContext } from 'react';
import { List, Avatar } from 'antd';
import { User } from '@my-garage/common';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';

interface StyledListItemProps {
  isSelected: boolean;
}

interface ListItemProps {
  item: User;
}

const listItemMeta = {
  padding: '16px',
  cursor: 'pointer',
};

const StyledListItem = styled(({ isSelected, ...props }) => (
  <List.Item {...props} />
))<StyledListItemProps>`
  padding: 0;
  background-color: ${({ isSelected }) => (isSelected ? 'var(--ant-primary-1)' : 'transparent')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    width: 6px;
    height: 100%;
    background-color: ${({ isSelected }) =>
      isSelected ? 'var(--ant-primary-color)' : 'transparent'};
    transition: transform 100ms ease-out;
    transform: scaleY(${({ isSelected }) => (isSelected ? 1 : 0)});
  }
`;

const UserListItem = ({ item }: ListItemProps) => {
  const { selectedUser, setSelectedUser } = useContext(AdminContext);

  const isThisUserSelected = selectedUser.fullName === item.fullName;

  return (
    <StyledListItem
      onClick={() => {
        setSelectedUser(item);
      }}
      data-testid="userList.item"
      isSelected={isThisUserSelected}
      key={item.id}
    >
      <List.Item.Meta
        data-testid="userList.item.meta"
        style={listItemMeta}
        avatar={
          <Avatar
            size={{ xs: 50, sm: 50, md: 50, lg: 60, xl: 60, xxl: 60 }}
            src="https://randomuser.me/api/portraits/men/75.jpg"
          />
        }
        title={item.fullName}
        description={item.email}
      />
    </StyledListItem>
  );
};

export default UserListItem;
