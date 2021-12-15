import React, { useContext, useMemo } from 'react';
import { apiClient, BookingWithUser } from '@my-garage/common';
import { groupBy } from 'lodash';
import { isSameDay, isThisWeek } from 'date-fns';
import { useQuery } from 'react-query';
import { AuthContext } from 'src/contexts/AuthContext';
import { mapBooking } from 'src/utils';
import styled from 'styled-components';
import { Empty, Spin } from 'antd';
import { isBetweenInclusive } from '../NewBooking/utils';
import ListSection from '../common/ListSection';
import BookingListItem from '../common/BookingListItem';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CenteredLayout = styled.div`
  @media screen and (max-width: 992px) {
    padding: var(--padding-m);
  }

  padding: var(--padding-xl);
  width: 100%;
  height: 100%;
  min-height: 0;
`;

const Content = styled.div`
  width: 100%;
  margin: auto;
  max-width: 600px;
  max-height: 100%;
  overflow: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Spinner = styled(Spin)`
  align-self: center;
  justify-self: center;
  margin: var(--padding-l);
`;

const StyledEmpty = styled(Empty)`
  margin: var(--padding-l);
`;

const useMyBookings = () => {
  const { user, token } = useContext(AuthContext);

  const {
    data: bookings,
    isLoading,
    error,
    ...rest
  } = useQuery(['my-bookings', user], () => {
    if (!user) return null;

    return apiClient
      .get<{ items: Array<BookingWithUser & { startAt: string; endAt: string }> }>('/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: user.id,
          limit: 0,
          mode: 'future',
          includePrevious: true,
        },
      })
      .then((response) => response.data)
      .then(({ items, ...restOfItem }) => ({
        ...restOfItem,
        items: items.map((i) => mapBooking<BookingWithUser>(i)),
      }));
  });

  return { bookings, isLoading, error, ...rest };
};

const groupings = ['Today', 'This week', 'Future'] as const;

function MyBookings() {
  const { bookings, isLoading } = useMyBookings();

  const groupedBookings = useMemo(() => {
    if (!bookings?.items) return null;

    return groupBy(bookings?.items, (booking): typeof groupings[number] => {
      const now = new Date();
      const isToday =
        isSameDay(now, booking.startAt) ||
        isSameDay(now, booking.endAt) ||
        isBetweenInclusive(now, [booking.startAt, booking.endAt]);

      if (isToday) return 'Today';

      const thisWeek = isThisWeek(booking.startAt);
      if (thisWeek) return 'This week';

      return 'Future';
    });
  }, [bookings]);

  return (
    <Root>
      <CenteredLayout>
        <Content>
          {isLoading && <Spinner size="large" />}

          {!isLoading &&
            (groupedBookings && Object.keys(groupedBookings).length > 0 ? (
              Object.entries(groupedBookings).map(([type, itemsOfType]) => (
                <ListSection
                  key={type}
                  items={itemsOfType}
                  listHeader={type}
                  renderItem={(item) => <BookingListItem booking={item} />}
                />
              ))
            ) : (
              <StyledEmpty />
            ))}
        </Content>
      </CenteredLayout>
    </Root>
  );
}

export default MyBookings;
