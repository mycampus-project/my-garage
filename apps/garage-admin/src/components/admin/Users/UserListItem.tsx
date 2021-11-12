import { useContext } from 'react';
import { List, Avatar } from 'antd';
import { User } from '@my-garage/common';
import styled from 'styled-components';
import { AdminContext } from '../Common/AdminContext';

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
  background-color: var(--primaryNokiaColor);
`;

interface ListItemProps {
  item: User;
}

const UserListItem = ({ item }: ListItemProps) => {
  const { userSelected, setUserSelected } = useContext(AdminContext);

  let isSelected;
  let listItemStyle;

  if (userSelected.fullName === item.fullName) {
    isSelected = <SelectedDiv data-testid="userList.item.selected" />;
    listItemStyle = {
      padding: '0',
      backgroundColor: 'var(--highlightColor)',
    };
  } else {
    listItemStyle = {
      padding: '0',
    };
  }

  return (
    <List.Item
      data-testid="userList.item"
      onClick={() => {
        setUserSelected(item);
      }}
      key={item.fullName}
      style={listItemStyle}
    >
      <List.Item.Meta
        data-testid="userList.item.meta"
        style={listItemMeta}
        avatar={<Avatar size={48} src="https://randomuser.me/api/portraits/men/75.jpg" />}
        title={item.fullName}
        description={item.email}
      />
      {isSelected}
    </List.Item>
  );
};

export default UserListItem;
