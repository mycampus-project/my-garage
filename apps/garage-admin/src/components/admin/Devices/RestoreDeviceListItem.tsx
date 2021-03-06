import { useContext } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import { Thing } from '@my-garage/common';
import styled from 'styled-components';
import baseURL from 'src/utilities/api';
import useThing from 'src/hooks/useThing';
import { AdminContext } from '../../../contexts/AdminContext';

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
  const { onRestore, isLoadingRestoreThing } = useThing().RestoreThing();

  return (
    <Spin spinning={isLoadingRestoreThing}>
      <StyledListItem
        data-testid="restoreList.item"
        key={item.id}
        actions={
          showRestoreButtons && [
            <Button
              data-testid="restoreList.item.restoreBtn"
              onClick={() => {
                onRestore(item.id);
                setModelIsVisible(false);
              }}
            >
              Restore
            </Button>,
          ]
        }
      >
        <List.Item.Meta
          data-testid="deviceList.item.meta"
          style={listItemMeta}
          avatar={
            <Avatar
              size={{
                xs: 50,
                sm: 50,
                md: 50,
                lg: 60,
                xl: 60,
                xxl: 60,
              }}
              src={`${baseURL}/static/${item.imageUrl}`}
            />
          }
          title={item.name}
          description={item.type}
        />
      </StyledListItem>
    </Spin>
  );
};

RestoreDeviceListItem.defaultProps = defaultProps;

export default RestoreDeviceListItem;
