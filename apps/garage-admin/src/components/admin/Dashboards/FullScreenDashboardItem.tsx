import { BookingWithUser, Thing } from '@my-garage/common';
import { Avatar, List, Spin } from 'antd';
import useBooking from 'src/hooks/useBooking';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { differenceInMinutes, parseISO, endOfToday, formatISO } from 'date-fns';

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

function processBookingCongestion(data: BookingWithUser[], minutesLeftInDay: number) {
  let timeBooked = 0;

  data.forEach((booking) => {
    timeBooked += differenceInMinutes(
      parseISO(booking.endAt.toString()),
      parseISO(booking.startAt.toString()),
    );
  });

  const percent = Math.floor((timeBooked / minutesLeftInDay) * 100);

  if (percent < 40) {
    return 'green.jpg';
  }
  if (percent > 70) {
    return 'red.jpg';
  }
  return 'amber.jpg';
}

const FullscreenDashboardItem = ({ item }: FullscreenDashboardItemProps) => {
  const currentTime = formatISO(new Date());
  const endOfDay = endOfToday().toISOString();

  const diffInMinutes = differenceInMinutes(parseISO(endOfDay), parseISO(currentTime));

  const { data, isLoading, error } = useBooking().GetThingBookingsByDate(
    item.id,
    currentTime,
    endOfDay,
  );
  const [bookingData, setBookingData] = useState<BookingWithUser[]>([]);

  useEffect(() => {
    const array = data ? data.data.items : [];
    setBookingData(array);
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
            size={{ lg: 70, xl: 70, xxl: 100 }}
            src={processBookingCongestion(bookingData, diffInMinutes)}
          />
        }
      />
      <Title>{item.name}</Title>
    </StyledListItem>
  );
};

export default FullscreenDashboardItem;
