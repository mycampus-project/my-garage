import { Thing } from '@my-garage/common';
import { Divider, List } from 'antd';
import DeviceListItem from './DeviceListItem';

interface Props {
  type: string;
  items: Thing[];
  selectedItem: Thing | null;
  onItemSelect: (thing: Thing) => void;
}

const DeviceListSection = ({ type, items, selectedItem, onItemSelect }: Props) => (
  <>
    <Divider orientation="left">{type}</Divider>
    <List
      dataSource={items}
      renderItem={(item) => (
        <DeviceListItem
          isSelected={item.id === selectedItem?.id}
          item={item}
          onClick={onItemSelect}
        />
      )}
    />
  </>
);

export default DeviceListSection;
