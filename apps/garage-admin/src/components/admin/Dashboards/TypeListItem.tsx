import { List, Button, Spin, Space } from 'antd';
import { Type } from '@my-garage/common';
import useType from 'src/hooks/useType';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import styled from 'styled-components';

interface ListItemProps {
  item: Type;
  showRestoreButtons?: boolean;
}

const defaultProps = {
  showRestoreButtons: false,
};

const listItemMeta = {
  paddingTop: '16px',
};

const BoldSpan = styled.span`
  font-weight: 500;
  color: #292929b5;
`;

const TypeListItem = ({ item, showRestoreButtons }: ListItemProps) => {
  const { onRestore, isLoadingRestoreType } = useType().RestoreType();
  const { setModelIsVisible, setModelType, setSelectedType } = useContext(AdminContext);

  const restoreButton = (
    <Button
      onClick={() => {
        onRestore(item.id);
      }}
    >
      Restore
    </Button>
  );

  const deleteButton = (
    <Space direction="horizontal" size="middle">
      <Button
        onClick={() => {
          setSelectedType(item);
          setModelIsVisible(true);
          setModelType('delete-type');
        }}
      >
        Delete
      </Button>
      <Button
        onClick={() => {
          setSelectedType(item);
          setModelIsVisible(true);
          setModelType('update-type');
        }}
      >
        Update
      </Button>
    </Space>
  );

  const handleTime = (time: number) => {
    const days = Math.floor(time / 1440);
    const leftoverMinutes = time % 1440;
    const hours = Math.floor(leftoverMinutes / 60);
    const mins = time - days * 1440 - hours * 60;
    return `${days} days ${hours} hours ${mins} mins`;
  };

  return (
    <Spin spinning={isLoadingRestoreType}>
      <List.Item
        data-testid="typeList.item"
        actions={showRestoreButtons ? [restoreButton] : [deleteButton]}
      >
        <List.Item.Meta
          data-testid="typeList.item.meta"
          style={listItemMeta}
          title={item.name}
          description={
            <p>
              <BoldSpan>Max Booking Time:</BoldSpan> {handleTime(item.maxBookingDuration)}
            </p>
          }
        />
      </List.Item>
    </Spin>
  );
};

TypeListItem.defaultProps = defaultProps;

export default TypeListItem;
