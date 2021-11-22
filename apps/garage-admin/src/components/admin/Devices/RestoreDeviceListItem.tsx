import { useContext } from 'react';
import { List, Avatar, Button } from 'antd';
import { Thing } from '@my-garage/common';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';
import openNotificationWithIcon from '../Common/OpenNotificationWithIcon';

interface ListItemProps {
  item: Thing;
  showRestoreButtons?: boolean;
}

const defaultProps = {
  showRestoreButtons: false,
};

interface StyledListItemProps {
  isSelected: boolean;
}

const listItemMeta = {
  padding: '16px',
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

const RestoreDeviceListItem = ({ item, showRestoreButtons }: ListItemProps) => {
  const { setModelIsVisible } = useContext(AdminContext);

  return (
    <StyledListItem
      data-testid="deviceList.item"
      key={item.name}
      actions={
        showRestoreButtons && [
          <Button
            onClick={() => {
              openNotificationWithIcon('info', 'Device Restored', 'test');
              setModelIsVisible(false);
            }}
          >
            {' '}
            Restore
          </Button>,
        ]
      }
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

RestoreDeviceListItem.defaultProps = defaultProps;

export default RestoreDeviceListItem;
