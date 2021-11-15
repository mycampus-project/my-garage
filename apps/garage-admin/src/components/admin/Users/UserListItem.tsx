import { useContext } from 'react';
import { List, Avatar } from 'antd';
import { User } from '@my-garage/common';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';

const listItemMeta = {
  padding: '16px',
  cursor: 'pointer',
};

const SelectedDiv = styled.div`
  display: flex;
  align-self: end;
  justify-self: end;
  margin: 0;
  width: 6px;
  height: 82px;
  background-color: var(--ant-primary-color);
`;

const StyledListItem = styled(List.Item)<{
  isSelected: boolean;
}>`
  padding: 0;
  background-color: ${({ isSelected }) => (isSelected ? 'var(--ant-primary-1)' : 'transparent')};
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
      {isThisUserSelected && <SelectedDiv data-testid="userList.item.selected" />}
    </StyledListItem>
  );
};

export default UserListItem;
