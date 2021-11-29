import { Thing } from '@my-garage/common';
import { Divider, List } from 'antd';
import DeviceListItem from './DeviceListItem';

interface Props {
  type: string;
  items: Thing[];
}

const DeviceListSection = ({ type, items }: Props) => (
  <>
    <Divider data-testid="device.list.divider" orientation="left">
      {type}
    </Divider>
    <List
      data-testid="device.list"
      dataSource={items}
      renderItem={(item) => <DeviceListItem item={item} />}
    />
  </>
);

export default DeviceListSection;
