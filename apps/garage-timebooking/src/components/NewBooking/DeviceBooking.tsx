import { format, getWeek, set, setDay, setWeek } from 'date-fns';
import { Thing, START_HOUR, END_HOUR, BOOKING_UNIT } from '@my-garage/common';
import moment from 'moment';
import { DatePicker, PageHeader, Space, Form, Typography, Image, Button } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

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

const getInitialWeekValue = () => {
  const now = new Date();

  if (now.getDay() > 5) {
    return setWeek(now, getWeek(now) + 1);
  }
  return now;
};

const useBookingsForWeek = (week: Date): Array<{ startAt: Date; endAt: Date }> => [
  {
    startAt: set(setDay(week, 1), { hours: 11, minutes: 0, seconds: 0, milliseconds: 0 }),
    endAt: set(setDay(week, 1), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }),
  },
  {
    startAt: set(setDay(week, 1), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }),
    endAt: set(setDay(week, 1), { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 }),
  },
  {
    startAt: set(setDay(week, 2), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 }),
    endAt: set(setDay(week, 2), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
  },
];

interface Props {
  thing: Thing;
  onBackClick: () => void;
}

const DeviceBooking = ({ thing, onBackClick }: Props) => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(getInitialWeekValue());
  const bookingsForWeek = useBookingsForWeek(selectedWeek);

  const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null);

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
              <Button size="large" type="primary" disabled={!selectedInterval}>
                Book
              </Button>
            </Form.Item>
          </Form>
        </Space>
        <BookingTable
          selectedWeek={selectedWeek}
          occupiedIntervals={bookingsForWeek.map((booking) => ({
            start: booking.startAt,
            end: booking.endAt,
          }))}
          startHour={START_HOUR}
          endHour={END_HOUR}
          timeUnit={BOOKING_UNIT}
          onIntervalSelect={setSelectedInterval}
          selectedInterval={selectedInterval}
          maxBookingLengthMinutes={2880}
        />
      </Root>
    </>
  );
};

export default DeviceBooking;