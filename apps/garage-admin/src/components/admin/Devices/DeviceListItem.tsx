import { useContext } from 'react';
import { List, Avatar } from 'antd';
import { Thing } from '@my-garage/common';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';

interface ListItemProps {
  item: Thing;
}

interface StyledListItemProps {
  isSelected: boolean;
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

const DeviceListItem = ({ item }: ListItemProps) => {
  const { selectedThing, setSelectedThing } = useContext(AdminContext);

  const isThisUserSelected = selectedThing.name === item.name;

  return (
    <StyledListItem
      onClick={() => {
        setSelectedThing(item);
      }}
      data-testid="deviceList.item"
      isSelected={isThisUserSelected}
      key={item.name}
    >
      <List.Item.Meta
        data-testid="deviceList.item.meta"
        style={listItemMeta}
        avatar={<Avatar size={48} src="https://randomuser.me/api/portraits/men/22.jpg" />}
        title={item.name}
        description={item.type}
      />
    </StyledListItem>
  );
};

export default DeviceListItem;
