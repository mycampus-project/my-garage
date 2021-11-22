import { List, Avatar, Button } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import { BookingData } from '../../../types/adminTypes';
import BookingTimings from '../Common/BookingTimings';

interface UserBookingItemProps {
  item: BookingData;
}

const UserBookingItem = ({ item }: UserBookingItemProps) => {
  const { setModelIsVisible, setModelType } = useContext(AdminContext);

  return (
    <List.Item
      actions={[
        <Button
          onClick={() => {
            setModelType('edit-booking');
            setModelIsVisible(true);
          }}
        >
          Edit
        </Button>,
        <Button
          onClick={() => {
            setModelType('delete-booking');
            setModelIsVisible(true);
          }}
        >
          Delete
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={item.thing.name}
        description={new Date(item.date).toDateString()}
      />
      <BookingTimings item={item} />
    </List.Item>
  );
};

export default UserBookingItem;
