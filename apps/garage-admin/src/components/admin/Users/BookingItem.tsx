import { List, Avatar, Button } from 'antd';
import { User } from '@my-garage/common';
import BookingTimings from './BookingTimings';

type BookingData = {
  title: string;
  date: Date;
  user: User;
};

interface BookingItemProps {
  item: BookingData;
}

const BookingItem = ({ item }: BookingItemProps) => (
  <List.Item actions={[<Button>Edit</Button>, <Button>Delete</Button>]}>
    <List.Item.Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={item.title}
      description={new Date(item.date).toDateString()}
    />
    <BookingTimings item={item} />
  </List.Item>
);

export default BookingItem;
