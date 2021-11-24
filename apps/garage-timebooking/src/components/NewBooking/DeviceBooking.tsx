import { getWeek, set, setDay, setWeek } from 'date-fns';
import { Thing, START_HOUR, END_HOUR, BOOKING_UNIT } from '@my-garage/common';
import moment from 'moment';
import { DatePicker, PageHeader, Space, Form, Typography } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import BookingTable from './BookingTable';

const Root = styled.div`
  padding: var(--padding-m);
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
    endAt: set(setDay(week, 1), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }),
    startAt: set(setDay(week, 1), { hours: 11, minutes: 0, seconds: 0, milliseconds: 0 }),
  },
];

interface Props {
  thing: Thing;
  onBackClick: () => void;
}

const DeviceBooking = ({ thing, onBackClick }: Props) => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(getInitialWeekValue());
  const bookingsForWeek = useBookingsForWeek(selectedWeek);

  return (
    <>
      <PageHeader
        title={thing.name}
        footer={<Typography.Paragraph type="secondary">{thing.description}</Typography.Paragraph>}
        ghost
        onBack={onBackClick}
      />
      <Root>
        <Space direction="vertical">
          <Form layout="vertical">
            <Form.Item label="Select week">
              <DatePicker
                value={moment(selectedWeek)}
                allowClear={false}
                onChange={(value) => {
                  if (!value) return;
                  setSelectedWeek(value.toDate());
                }}
                picker="week"
              />
            </Form.Item>
          </Form>
        </Space>
        <BookingTable
          selectedWeek={selectedWeek}
          occupiedIntervals={bookingsForWeek}
          startHour={START_HOUR}
          endHour={END_HOUR}
          timeUnit={BOOKING_UNIT}
        />
      </Root>
    </>
  );
};

export default DeviceBooking;
