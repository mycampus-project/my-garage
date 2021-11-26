import { List, Button, Spin } from 'antd';
import { Type } from '@my-garage/common';
import useType from 'src/hooks/useType';

interface ListItemProps {
  item: Type;
  showRestoreButtons?: boolean;
}

const defaultProps = {
  showRestoreButtons: false,
};

const listItemMeta = {
  padding: '16px',
};

const TypeListItem = ({ item, showRestoreButtons }: ListItemProps) => {
  const { onDelete, isLoadingDeleteType } = useType().DeleteType();
  const { onRestore, isLoadingRestoreType } = useType().RestoreType();

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
    <Button
      onClick={() => {
        onDelete(item.id);
      }}
    >
      Delete
    </Button>
  );

  return (
    <Spin spinning={isLoadingDeleteType || isLoadingRestoreType}>
      <List.Item
        data-testid="typeList.item"
        actions={showRestoreButtons ? [restoreButton] : [deleteButton]}
      >
        <List.Item.Meta data-testid="typeList.item.meta" style={listItemMeta} title={item.name} />
      </List.Item>
    </Spin>
  );
};

TypeListItem.defaultProps = defaultProps;

export default TypeListItem;
