import { useContext } from 'react';
import { List, Avatar } from 'antd';
import { Thing } from '@my-garage/common';
import styled from 'styled-components';
import baseURL from 'src/utilities/api';
import { AdminContext } from '../../../contexts/AdminContext';

interface ListItemProps {
  item: Thing;
}

interface StyledListItemProps {
  $isSelected: boolean;
}

const listItemMeta = {
  padding: '16px',
  cursor: 'pointer',
};

const StyledListItem = styled(List.Item)<StyledListItemProps>`
  padding: 0;
  background-color: ${({ $isSelected }) => ($isSelected ? 'var(--ant-primary-1)' : 'transparent')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    width: 6px;
    height: 100%;
    background-color: ${({ $isSelected }) =>
      $isSelected ? 'var(--ant-primary-color)' : 'transparent'};
    transition: transform 100ms ease-out;
    transform: scaleY(${({ $isSelected }) => ($isSelected ? 1 : 0)});
  }
`;

const DeviceListItem = ({ item }: ListItemProps) => {
  const { selectedThing, setSelectedThing } = useContext(AdminContext);

  const isThisUserSelected = selectedThing ? selectedThing.id === item.id : false;

  return (
    <StyledListItem
      onClick={() => {
        setSelectedThing(item);
      }}
      data-testid="deviceList.item"
      $isSelected={isThisUserSelected}
      key={item.name}
    >
      <List.Item.Meta
        data-testid="deviceList.item.meta"
        style={listItemMeta}
        avatar={
          <Avatar
            size={{ xs: 50, sm: 50, md: 50, lg: 60, xl: 60, xxl: 60 }}
            src={`${baseURL}/static/${item.imageUrl}`}
          />
        }
        title={item.name}
        description={item.description}
      />
    </StyledListItem>
  );
};

export default DeviceListItem;
