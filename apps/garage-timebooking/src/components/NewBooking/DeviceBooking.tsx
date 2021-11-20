import { format, getWeek, isSameDay, set, setDay, setWeek } from 'date-fns';
import { Thing } from '@my-garage/common';
import moment from 'moment';
import { DatePicker, PageHeader, Space, Form, Typography } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  padding: var(--padding-m);
`;

const CELL_WIDTH = 200;

const Table = styled.table`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  min-width: 0;
  position: relative;
  table-layout: fixed;

  @media (max-width: 992px) {
    display: block;
  }

  tbody tr {
    &:nth-child(2n + 1) {
      background-color: #f7f7f7;
    }
    &:nth-child(2n) {
      background-color: white;
    }
  }

  th,
  td {
    border: 1px solid rgba(0, 0, 0, 0.06);
    padding: var(--padding-xs);
  }
`;

const TimeTh = styled.th`
  position: sticky;
  left: 0;
  min-width: 100px;
  background-color: inherit;
`;

const createTimeRanges = (weekDays: Date[], startHour: number, endHour: number) => {
  const diff = endHour - startHour;

  const hoursCollection = new Array(diff).fill(null).flatMap((_, index) => [
    {
      hours: startHour + index,
      minutes: 0,
    },
    {
      hours: startHour + index,
      minutes: 30,
    },
  ]);

  return hoursCollection.map(({ hours, minutes }) =>
    weekDays.map((weekday) => set(weekday, { hours, minutes })),
  );
};

const createWeekdaysForWeek = (weekDate: Date) => {
  const baseDate = set(weekDate, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  return [1, 2, 3, 4, 5].map((weekday) => setDay(baseDate, weekday, { weekStartsOn: 0 }));
};

const SelectableTd = styled.td`
  @media (max-width: 992px) {
    min-width: ${CELL_WIDTH}px;
  }

  &:hover {
    background-color: var(--ant-primary-1);
  }
`;

const getInitialWeekValue = () => {
  const now = new Date();

  if (now.getDay() > 5) {
    return setWeek(now, getWeek(now) + 1);
  }
  return now;
};

interface Props {
  thing: Thing;
  onBackClick: () => void;
}

const DeviceBooking = ({ thing, onBackClick }: Props) => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(getInitialWeekValue());

  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();

  const weekdays = createWeekdaysForWeek(selectedWeek);
  const weekTimeRanges = createTimeRanges(weekdays, 9, 18);

  const onCellClick = (cellDate: Date) => {
    if (start && end) {
      setStart(cellDate);
      setEnd(undefined);
    } else if (start && isSameDay(start, cellDate)) {
      setEnd(cellDate);
    } else {
      setStart(cellDate);
    }
  };

  console.log({ start, end });

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
                  console.log(value.format());
                  setSelectedWeek(value.toDate());
                }}
                picker="week"
              />
            </Form.Item>
          </Form>
        </Space>
        <Table>
          <thead>
            <tr>
              <th>Week {getWeek(selectedWeek)}</th>
              {weekdays.map((weekday) => (
                <th key={weekday.getDay()}>{format(weekday, 'eee d.MM.y')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekTimeRanges?.map((weekdayOptions) => (
              <tr key={format(weekdayOptions[0], 'HH:mm')}>
                <TimeTh>{format(weekdayOptions[0], 'HH:mm')}</TimeTh>
                {weekdayOptions.map((day) => (
                  <SelectableTd key={day.getTime()} onClick={() => onCellClick(day)} />
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Root>
    </>
  );
};

export default DeviceBooking;
