import { endOfWeek, format, getWeek, setWeek, startOfWeek } from 'date-fns';
import {
  Thing,
  START_HOUR,
  END_HOUR,
  BOOKING_UNIT,
  apiClient,
  Booking,
  BookingWithUser,
} from '@my-garage/common';
import moment from 'moment';
import { DatePicker, PageHeader, Space, Form, Typography, Image, Button, Spin } from 'antd';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';
import { AuthContext } from 'src/contexts/AuthContext';
import BookingTable from './BookingTable';
import { Interval } from './utils';

const Root = styled.div`
  padding: var(--padding-m);
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  padding: var(--padding-m);
`;

const StyledPageHeader = styled(PageHeader)`
  flex: 1;
`;

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.06);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getInitialWeekValue = () => {
  const now = new Date();

  if (now.getDay() > 5) {
    return setWeek(now, getWeek(now) + 1);
  }
  return now;
};

const useBookingsForWeek = (selectedWeek: Date, thingId: string) => {
  const { token } = useContext(AuthContext);
  const { data } = useQuery(['bookings', selectedWeek, thingId], async () =>
    apiClient
      .get<{ items: (Booking | BookingWithUser)[] }>('/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          start: startOfWeek(selectedWeek).toISOString(),
          end: endOfWeek(selectedWeek).toISOString(),
          thingId,
          limit: 0,
        },
      })
      .then((response) => response.data)
      .then((bookings) =>
        bookings.items.map((booking) => ({
          ...booking,
          startAt: new Date(booking.startAt),
          endAt: new Date(booking.endAt),
        })),
      ),
  );

  return data;
};

const useBookInterval = (selectedInterval: Interval | null, thingId: string) => {
  const { token } = useContext(AuthContext);
  const {
    mutate: sendBooking,
    data: booking,
    ...rest
  } = useMutation(['book interval', selectedInterval, thingId], () => {
    if (!selectedInterval) throw Error('Interval not selected');

    return apiClient
      .post<BookingWithUser>(
        '/bookings',
        {
          thingId,
          startAt: selectedInterval.start,
          endAt: selectedInterval.end,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => response.data)
      .then((bookingData) => ({
        ...bookingData,
        startAt: new Date(bookingData.startAt),
        endAt: new Date(bookingData.endAt),
      }));
  });

  return {
    sendBooking,
    booking,
    ...rest,
  };
};

interface Props {
  thing: Thing;
  onBackClick: () => void;
}

const DeviceBooking = ({ thing, onBackClick }: Props) => {
  const { user } = useContext(AuthContext);
  const [selectedWeek, setSelectedWeek] = useState<Date>(getInitialWeekValue());
  const bookingsForWeek = useBookingsForWeek(selectedWeek, thing.id);

  const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null);
  const { sendBooking, booking, isLoading } = useBookInterval(selectedInterval, thing.id);

  if (booking) {
    return <Navigate to={`/current/${booking.id}`} state={booking} />;
  }

  return (
    <>
      <HeaderRow>
        <StyledPageHeader
          title={thing.name}
          footer={<Typography.Paragraph type="secondary">{thing.description}</Typography.Paragraph>}
          ghost
          onBack={onBackClick}
        />
        <ImageContainer>
          <Image
            wrapperClassName="image"
            width={200}
            src={`${process.env.REACT_APP_BACKEND_URL}/static/${thing.imageUrl}`}
          />
        </ImageContainer>
      </HeaderRow>
      <Root>
        {isLoading && (
          <Loader>
            <Spin size="large" />
          </Loader>
        )}
        <Space direction="vertical">
          <Form layout="vertical">
            <Form.Item label="Select week">
              <DatePicker
                disabledDate={(current) =>
                  // Can not select days before today and today
                  current && current < moment().startOf('day')
                }
                value={moment(selectedWeek)}
                allowClear={false}
                onChange={(value) => {
                  if (!value) return;
                  setSelectedWeek(value.toDate());
                }}
                picker="week"
              />
            </Form.Item>
            <Form.Item
              label="Selected time"
              style={{
                pointerEvents: 'none',
              }}
            >
              <Space>
                <DatePicker.RangePicker
                  format={(value) => format(value.toDate(), 'eee dd.MM HH:mm')}
                  value={
                    selectedInterval && [
                      moment(selectedInterval.start),
                      moment(selectedInterval.end),
                    ]
                  }
                  allowClear={false}
                  showTime={{
                    minuteStep: BOOKING_UNIT,
                    showSecond: false,
                  }}
                />
                <Button
                  style={{
                    pointerEvents: 'all',
                  }}
                  onClick={() => setSelectedInterval(null)}
                >
                  Clear
                </Button>
              </Space>
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                disabled={!selectedInterval}
                loading={isLoading}
                onClick={() => sendBooking()}
              >
                Book
              </Button>
            </Form.Item>
          </Form>
        </Space>
        {bookingsForWeek ? (
          <BookingTable
            selectedWeek={selectedWeek}
            occupiedIntervals={bookingsForWeek.map((b) => ({
              start: b.startAt,
              end: b.endAt,
              type: 'user' in b && b.user.id === user?.id ? 'user' : 'unknown',
            }))}
            startHour={START_HOUR}
            endHour={END_HOUR}
            timeUnit={BOOKING_UNIT}
            onIntervalSelect={setSelectedInterval}
            selectedInterval={selectedInterval}
            maxBookingLengthMinutes={2880}
          />
        ) : (
          <Spin size="large" />
        )}
      </Root>
    </>
  );
};

export default DeviceBooking;
