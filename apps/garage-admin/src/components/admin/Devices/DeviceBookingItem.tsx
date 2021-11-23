import { List, Avatar, Button } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import styled from 'styled-components';
import { BookingData } from '../../../types/adminTypes';
import BookingTimings from '../Common/BookingTimings';

interface BookingItemProps {
  item: BookingData;
}

const StyledListItem = styled(List.Item)`
  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
`;

const DeviceBookingItem = ({ item }: BookingItemProps) => {
  const { setModelIsVisible, setModelType } = useContext(AdminContext);

  return (
    <StyledListItem
      actions={[
        <Button
          type="link"
          onClick={() => {
            setModelType('edit-booking');
            setModelIsVisible(true);
          }}
        >
          Edit
        </Button>,
        <Button
          type="link"
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
        title={item.user.fullName}
        description={<BookingTimings item={item} />}
      />
    </StyledListItem>
  );
};

export default DeviceBookingItem;
