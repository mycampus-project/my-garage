import { BookingWithUser, Thing } from '@my-garage/common';
import { Avatar, List, Spin } from 'antd';
import useBooking from 'src/hooks/useBooking';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const StyledListItem = styled(List.Item)`
  background-color: #fcf8f8;
  border-radius: 10px;
  padding: 16px;
  margin: 32px;
`;

const Title = styled.h1`
  display: flex;
  flex-grow: 1;
  font-size: 60px;
`;

interface FullscreenDashboardItemProps {
  item: Thing;
}

function calculateTotalBookedTime(startAt: Date, endAt: Date) {
  return dayjs(endAt).diff(startAt, 'h');
}

function processBookingCongestion(data: BookingWithUser[]) {
  let timeBooked = 0;
  let imgUrl = 'amber.jpg';

  data.forEach((booking) => {
    timeBooked += calculateTotalBookedTime(booking.startAt, booking.endAt);
  });

  const percent = Math.floor((timeBooked / 24) * 100);
  // console.log(`${item.name}, timeBooked ${timeBooked} `, percent);

  if (percent < 40) {
    imgUrl = 'green.jpg';
  }

  if (percent > 70) {
    imgUrl = 'red.jpg';
  }

  return imgUrl;
}

const FullscreenDashboardItem = ({ item }: FullscreenDashboardItemProps) => {
  const startAt = '2022-01-10T00:00:00.000Z';
  const endAt = '2022-01-11T00:00:00.000Z';
  const { data, isLoading, error } = useBooking().GetThingBookingsByDate(item.id, startAt, endAt);
  const [bookingData, setBookingData] = useState<BookingWithUser[]>([]);

  useEffect(() => {
    const array = data ? data.data.items : [];

    const filteredData = array.filter((element) => {
      if (
        new Date(element.startAt) > new Date(startAt) &&
        new Date(element.endAt) < new Date(endAt)
      ) {
        return element;
      }
      return false;
    });

    setBookingData(filteredData);
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <StyledListItem>
      <List.Item.Meta
        avatar={
          <Avatar
            size={{ lg: 100, xl: 150, xxl: 150 }}
            src={processBookingCongestion(bookingData)}
          />
        }
      />
      <Title>{item.name}</Title>
    </StyledListItem>
  );
};

export default FullscreenDashboardItem;
