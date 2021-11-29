import { useContext } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import styled from 'styled-components';
import useUser from 'src/hooks/useUser';
import { User } from '@my-garage/common';
import { AdminContext } from '../../../contexts/AdminContext';

interface ListItemProps {
  item: User;
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

const RestoreUserListItem = ({ item, showRestoreButtons }: ListItemProps) => {
  const { setModelIsVisible } = useContext(AdminContext);
  const { onRestoreUser, isLoadingRestoreUser } = useUser().RestoreUser();

  return (
    <Spin spinning={isLoadingRestoreUser}>
      <StyledListItem
        data-testid="deviceList.item"
        key={item.id}
        actions={
          showRestoreButtons && [
            <Button
              onClick={() => {
                onRestoreUser(item.id);
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
              src="https://randomuser.me/api/portraits/men/75.jpg"
            />
          }
          title={item.fullName}
          description={item.email}
        />
      </StyledListItem>
    </Spin>
  );
};

RestoreUserListItem.defaultProps = defaultProps;

export default RestoreUserListItem;
