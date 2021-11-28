import { User } from '@my-garage/common';
import { Divider, List } from 'antd';
import UserListItem from './UserListItem';

interface Props {
  type: string;
  items: User[];
}

const DeviceListSection = ({ type, items }: Props) => (
  <>
    <Divider orientation="left">{type}</Divider>
    <List dataSource={items} renderItem={(item) => <UserListItem item={item} />} />
  </>
);

export default DeviceListSection;
