import { Divider, List } from 'antd';
import { Fragment } from 'react';

interface Props<T extends { id: string }> {
  listHeader: string;
  items: T[];
  selectedItem?: T | null;
  onItemSelect?: (item: T) => void;
  renderItem: (item: T, isSelected: boolean, onClick: () => void) => JSX.Element;
}

const ListSection = <T extends { id: string }>({
  listHeader,
  items,
  selectedItem,
  onItemSelect,
  renderItem,
}: Props<T>) => (
  <>
    <Divider data-testid="newBookingDivider" orientation="left">
      {listHeader}
    </Divider>
    <List
      dataSource={items}
      renderItem={(item) => (
        <Fragment key={item.id}>
          {renderItem(item, selectedItem?.id === item.id, () => onItemSelect?.(item))}
        </Fragment>
      )}
    />
  </>
);

export default ListSection;
