import { BookingWithUser } from '@my-garage/common';
import { List, Avatar, Button } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import styled from 'styled-components';

interface BookingItemProps {
  item: BookingWithUser;
}
const DescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-between;
  max-width: 600px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

  @media screen and (min-width: 1199px) {
    div {
      margin-left: 16px;
      flex-wrap: nowrap;
    }
  }
`;

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

const StyledSpan = styled.span`
  font-weight: 700;
`;

const DeviceBookingItem = ({ item }: BookingItemProps) => {
  const { setModelIsVisible, setModelType } = useContext(AdminContext);

  return (
    <StyledListItem
      actions={[
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
        description={
          <DescriptionContainer>
            <p>
              <StyledSpan>Date:</StyledSpan> {new Date(item.startAt).toLocaleDateString()}
            </p>
            <p>
              <StyledSpan>Start Time:</StyledSpan> {new Date(item.startAt).toLocaleTimeString()}
            </p>
            <p>
              <StyledSpan>End Time:</StyledSpan> {new Date(item.endAt).toLocaleTimeString()}
            </p>
          </DescriptionContainer>
        }
      />
    </StyledListItem>
  );
};

export default DeviceBookingItem;
