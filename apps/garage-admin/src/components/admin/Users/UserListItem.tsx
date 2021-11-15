import { useContext } from 'react';
import { List, Avatar } from 'antd';
import { User } from '@my-garage/common';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';

const listItemMeta = {
  padding: '16px',
  cursor: 'pointer',
};

const StyledListItem = styled(List.Item)<{
  isSelected: boolean;
}>`
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

interface ListItemProps {
  item: User;
}

const UserListItem = ({ item }: ListItemProps) => {
  const { userSelected, setUserSelected } = useContext(AdminContext);

  const isThisUserSelected = userSelected.fullName === item.fullName;

  return (
    <StyledListItem
      onClick={() => {
        setUserSelected(item);
      }}
      data-testid="userList.item"
      isSelected={isThisUserSelected}
      key={item.id}
    >
      <List.Item.Meta
        data-testid="userList.item.meta"
        style={listItemMeta}
        avatar={<Avatar size={48} src="https://randomuser.me/api/portraits/men/75.jpg" />}
        title={item.fullName}
        description={item.email}
      />
    </StyledListItem>
  );
};

export default UserListItem;
