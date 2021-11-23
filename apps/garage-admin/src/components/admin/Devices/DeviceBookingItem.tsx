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

    .ant-list-item-action {
      max-width: 100px;
      justify-content: start;
    }

    .ant-list-item-action-split {
    }

    li:first-child {
      margin: 8px;
    }
  }

  .ant-list-item-meta-content > div {
    color: rgba(0, 0, 0, 0.74);
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
        avatar={
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            size={{ xs: 50, sm: 50, md: 50, lg: 60, xl: 60, xxl: 60 }}
          />
        }
        title={item.user.fullName}
        description={<BookingTimings item={item} />}
      />
    </StyledListItem>
  );
};

export default DeviceBookingItem;
