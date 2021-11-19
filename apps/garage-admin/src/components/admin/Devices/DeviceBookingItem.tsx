import { List, Avatar, Button } from 'antd';
import { BookingData } from '../../../types/adminTypes';
import BookingTimings from '../Common/BookingTimings';
import openNotificationWithIcon from '../Common/OpenNotificationWithIcon';

interface BookingItemProps {
  item: BookingData;
}

const DeviceBookingItem = ({ item }: BookingItemProps) => (
  <List.Item
    actions={[
      <Button onClick={() => openNotificationWithIcon('info', 'test', 'test')}>Edit</Button>,
      <Button onClick={() => openNotificationWithIcon('info', 'test', 'test')}>Delete</Button>,
    ]}
  >
    <List.Item.Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={item.user.fullName}
      description={new Date(item.date).toDateString()}
    />
    <BookingTimings item={item} />
  </List.Item>
);

export default DeviceBookingItem;
