import { List } from 'antd';
import { User } from '@my-garage/common';
import BookingItem from './BookingItem';

type BookingData = {
  title: string;
  date: Date;
  user: User;
};

interface DataProps {
  data: BookingData[];
}

const BookingsList = ({ data }: DataProps) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => <BookingItem item={item} />}
  />
);

export default BookingsList;
