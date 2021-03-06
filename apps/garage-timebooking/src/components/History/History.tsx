import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { apiClient, BookingWithUser } from '@my-garage/common';
import { groupBy } from 'lodash';
import { useQuery } from 'react-query';
import { AuthContext } from 'src/contexts/AuthContext';
import { mapBooking } from 'src/utils';
import styled from 'styled-components';
import { DatePicker, Empty, Pagination, Spin } from 'antd';
import { format, isFuture } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
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
  max-width: 600px;
  max-height: 100%;
  margin: auto;
  overflow: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--padding-m);
`;

const Spinner = styled(Spin)`
  align-self: center;
  justify-self: center;
  margin: var(--padding-l);
`;

const StyledEmpty = styled(Empty)`
  margin: var(--padding-l);
`;

const useMyBookings = (page: number, perPage: number, start: Date | null, end: Date | null) => {
  const { user, token } = useContext(AuthContext);
  const isoStart = start?.toISOString();
  const isoEnd = end?.toISOString();

  const {
    data: bookings,
    isLoading,
    error,
    ...rest
  } = useQuery(['my-bookings', user, page, isoStart, isoEnd], () => {
    if (!user) return null;

    return apiClient
      .get<{ items: Array<BookingWithUser & { startAt: string; endAt: string }>; total: number }>(
        '/bookings',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: user.id,
            limit: perPage,
            offset: (page - 1) * perPage,
            mode: 'past',
            start: isoStart,
            end: isoEnd,
          },
        },
      )
      .then((response) => response.data)
      .then(({ items, ...restOfResponse }) => ({
        ...restOfResponse,
        items: items.map((i) => mapBooking<BookingWithUser>(i)),
      }));
  });

  return { bookings, isLoading, error, ...rest };
};

function History() {
  const [params, setParams] = useSearchParams({ page: '1' });
  const contentRef = useRef<HTMLDivElement>(null);
  const currentPage = Number(params.get('page'));
  const startDateParam = params.get('start');
  const startDate = startDateParam ? new Date(startDateParam) : null;

  const endDateParam = params.get('end');
  const endDate = endDateParam ? new Date(endDateParam) : null;

  const perPage = 10;

  const { bookings, isLoading } = useMyBookings(currentPage, perPage, startDate, endDate);

  const groupedBookings = useMemo(() => {
    if (!bookings?.items) return null;

    return groupBy(bookings?.items, (booking) => format(booking.startAt, 'eee dd MMMM yy'));
  }, [bookings]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <Root>
      <CenteredLayout>
        <Content ref={contentRef}>
          <DatePicker.RangePicker
            value={startDate && endDate ? [moment(startDate), moment(endDate)] : null}
            onChange={(range) =>
              setParams({
                start: range?.[0]?.toDate().toISOString() ?? '',
                end: range?.[1]?.toDate().toISOString() ?? '',
                page: '1',
              })
            }
            disabledDate={(cell) => isFuture(cell.toDate())}
          />
          {isLoading && <Spinner size="large" />}

          {!isLoading &&
            (groupedBookings && bookings && Object.keys(groupedBookings).length > 0 ? (
              Object.entries(groupedBookings).map(([type, itemsOfType]) => (
                <ListSection
                  key={type}
                  items={itemsOfType}
                  listHeader={type}
                  renderItem={(item) => <BookingListItem booking={item} allowDelete={false} />}
                />
              ))
            ) : (
              <StyledEmpty />
            ))}
          <PaginationContainer>
            <Pagination
              current={currentPage}
              onChange={(page) =>
                setParams({
                  page: page.toString(),
                  start: startDateParam ?? '',
                  end: endDateParam ?? '',
                })
              }
              pageSize={perPage}
              total={bookings?.total ?? 0}
              responsive
              hideOnSinglePage
            />
          </PaginationContainer>
        </Content>
      </CenteredLayout>
    </Root>
  );
}

export default History;
