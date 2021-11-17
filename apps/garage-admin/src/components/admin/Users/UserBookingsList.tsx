import { List } from 'antd';
import { BookingData } from '../../../types/adminTypes';
import UserBookingItem from './UserBookingItem';

interface DataProps {
  data: BookingData[];
}

const UserBookingsList = ({ data }: DataProps) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => <UserBookingItem item={item} />}
  />
);

export default UserBookingsList;
