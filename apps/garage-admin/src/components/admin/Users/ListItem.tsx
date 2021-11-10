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
  width: 4px;
  height: 82px;
  background-color: var(--primaryColor);
`;

const Name = styled.h1`
  margin: 0;
  margin-bottom: -8px;
`;

interface ListItemProps {
  item: User;
  onClick: (item: User) => void;
}

const ListItem = ({ item, onClick }: ListItemProps) => {
  const { userSelected, setUserSelected } = useContext(AdminContext);

  let isSelected;
  let listItemStyle;

  if (userSelected.fullName === item.fullName) {
    isSelected = <SelectedDiv />;
    listItemStyle = {
      padding: '0',
      backgroundColor: 'var(--secondaryColor)',
    };
  } else {
    listItemStyle = {
      padding: '0',
    };
  }

  return (
    <List.Item
      onClick={() => {
        onClick(item);
        setUserSelected(item);
      }}
      key={item.fullName}
      style={listItemStyle}
    >
      <List.Item.Meta
        style={listItemMeta}
        avatar={<Avatar size={48} src="https://randomuser.me/api/portraits/men/75.jpg" />}
        title={<Name>{item.fullName}</Name>}
        description={item.email}
      />
      {isSelected}
    </List.Item>
  );
};

export default ListItem;
