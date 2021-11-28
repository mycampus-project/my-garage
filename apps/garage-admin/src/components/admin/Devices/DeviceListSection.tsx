import { Thing } from '@my-garage/common';
import { Divider, List } from 'antd';
import DeviceListItem from './DeviceListItem';

interface Props {
  type: string;
  items: Thing[];
}

const DeviceListSection = ({ type, items }: Props) => (
  <>
    <Divider orientation="left">{type}</Divider>
    <List dataSource={items} renderItem={(item) => <DeviceListItem item={item} />} />
  </>
);

export default DeviceListSection;
