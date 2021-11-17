import { List, Avatar, Button } from 'antd';
import { BookingData } from '../../../types/adminTypes';
import BookingTimings from '../Common/BookingTimings';

interface UserBookingItemProps {
  item: BookingData;
}

const UserBookingItem = ({ item }: UserBookingItemProps) => (
  <List.Item actions={[<Button>Edit</Button>, <Button>Delete</Button>]}>
    <List.Item.Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={item.thing.name}
      description={new Date(item.date).toDateString()}
    />
    <BookingTimings item={item} />
  </List.Item>
);

export default UserBookingItem;
