import { apiClient } from '@my-garage/common';
import { groupBy } from 'lodash';
import { isThisWeek } from 'date-fns';
import { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from 'src/contexts/AuthContext';
import { mapBooking } from 'src/utils';
import { isBetweenInclusive } from '../NewBooking/utils';

const useMyBookings = () => {
  const { user, token } = useContext(AuthContext);

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery(['my-bookings', user], () => {
    if (!user) return null;

    return apiClient
      .get<{ items: Array<{ startAt: string; endAt: string }> }>('/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: user.id,
          limit: 0,
          mode: 'future',
        },
      })
      .then((response) => response.data)
      .then(({ items, ...rest }) => ({ ...rest, items: items.map(mapBooking) }));
  });

  return { bookings, isLoading, error };
};

const groupings = ['today', 'this week', 'future'] as const;

function MyBookings() {
  const { bookings } = useMyBookings();

  const groupedBookings = useMemo(() => {
    if (!bookings?.items) return null;

    return groupBy(bookings?.items, (booking): typeof groupings[number] => {
      const now = new Date();
      const isToday = isBetweenInclusive(now, [booking.startAt, booking.endAt]);

      if (isToday) return 'today';

      const thisWeek = isThisWeek(booking.startAt);
      if (thisWeek) return 'this week';

      return 'future';
    });
  }, [bookings]);

  console.log(groupedBookings);

  return <>CurrentBookings</>;
}

export default MyBookings;
