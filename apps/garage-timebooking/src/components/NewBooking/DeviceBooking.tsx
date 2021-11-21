import {
  addMinutes,
  format,
  getWeek,
  isBefore,
  isSameDay,
  isSameMinute,
  isWithinInterval,
  set,
  setDay,
  setWeek,
} from 'date-fns';
import { Thing } from '@my-garage/common';
import moment from 'moment';
import { DatePicker, PageHeader, Space, Form, Typography } from 'antd';
import { useLayoutEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

const Root = styled.div`
  padding: var(--padding-m);
`;

const CELL_WIDTH = 200;

const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;

  & > div:not(:first-of-type) {
    margin-top: -1px;
  }
`;
const HeaderColumn = styled(TableColumn)`
  position: sticky;
  left: 0;
`;
const Table = styled.div`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  min-width: 0;
  position: relative;
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  scroll-snap-type: x mandatory;
  scroll-padding-left: 100px;

  & > ${TableColumn}:not(:first-child) {
    margin-left: -1px;
  }

  tbody tr {
    &:nth-child(2n + 1) {
      background-color: #f7f7f7;
    }
    &:nth-child(2n) {
      background-color: white;
    }
  }
`;

const TableCell = styled.div`
  text-align: center;
  border: 1px solid #f0f0f0;
  padding: var(--padding-xs);
  background: white;
`;

const WeekdayHeaderCell = styled(TableCell)`
  z-index: 100;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

const HourHeaderCell = styled(TableCell)<{ isHighlighted: boolean }>`
  position: sticky;
  left: 0;
  z-index: 1;

  ${({ isHighlighted }) => isHighlighted && 'background-color: var(--ant-primary-1)'};
`;

const TimeCell = styled(TableCell)<{ isSelected: boolean; isStart: boolean; isEnd: boolean }>`
  flex: 1;

  &:nth-child(2n + 1) {
    background-color: #f8f8f8;
  }

  &:hover {
    background-color: var(--ant-primary-1);
  }
  ${({ isStart, isEnd }) => {
    if (isStart && isEnd) {
      return 'border-radius: 10px';
    }
    if (isStart) {
      return 'border-radius: 10px 10px 0 0';
    }
    if (isEnd) {
      return 'border-radius: 0 0 10px 10px ';
    }
    return null;
  }};

  ${({ isSelected }) =>
    isSelected &&
    css`
      &,
      &:hover {
        background-color: var(--ant-primary-color) !important;
        color: white;
        border-color: transparent;
      }
    `};

  @media (max-width: 992px) {
    min-width: ${CELL_WIDTH}px;
  }
`;

const getBookingIntervals = (startHour: number, endHour: number) => {
  const diff = endHour - startHour;

  return new Array(diff).fill(null).flatMap((_, index) => [
    {
      hours: startHour + index,
      minutes: 0,
    },
    {
      hours: startHour + index,
      minutes: 30,
    },
  ]);
};

const createTimeRanges = (weekDays: Date[], timesOfDay: { hours: number; minutes: number }[]) =>
  weekDays.map((weekday) =>
    timesOfDay.map(({ hours, minutes }) => set(weekday, { hours, minutes })),
  );

const createWeekdaysForWeek = (weekDate: Date) => {
  const baseDate = set(weekDate, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  return [1, 2, 3, 4, 5].map((weekday) => setDay(baseDate, weekday, { weekStartsOn: 0 }));
};

const getInitialWeekValue = () => {
  const now = new Date();

  if (now.getDay() > 5) {
    return setWeek(now, getWeek(now) + 1);
  }
  return now;
};

const sortDates = (dates: Date[]) =>
  dates.sort((a, b) => {
    if (isSameMinute(a, b)) {
      return 0;
    }
    return isBefore(a, b) ? -1 : 1;
  });

const isBetween = (date: Date, interval: [Date, Date]) => {
  const [start, end] = sortDates(interval);

  return isWithinInterval(date, { start, end });
};

const formatInterval = (a: Date, b: Date) => {
  const [start, end] = sortDates([a, b]);

  return `${format(start, 'HH:mm')}-${format(addMinutes(end, 30), 'HH:mm')}`;
};

// const formatSelectedInterval = (start: Date | undefined, end: Date | undefined, hoveredHour: Date, )

interface Props {
  thing: Thing;
  onBackClick: () => void;
}

const DeviceBooking = ({ thing, onBackClick }: Props) => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(getInitialWeekValue());

  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();
  const [hoveredHour, setHoveredHour] = useState<Date>();

  const bookingIntervals = useMemo(() => getBookingIntervals(9, 18), []);
  const weekdays = useMemo(() => createWeekdaysForWeek(selectedWeek), [selectedWeek]);
  const weekTimeRanges = useMemo(
    () => createTimeRanges(weekdays, bookingIntervals),
    [weekdays, bookingIntervals],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cells = useMemo(() => new Map<Date, HTMLDivElement>(), [weekTimeRanges]);

  const onCellClick = (cellDate: Date) => {
    if (start && end) {
      setStart(cellDate);
      setEnd(undefined);
    } else if (start && isSameDay(start, cellDate)) {
      if (isBefore(cellDate, start)) {
        setStart(cellDate);
        setEnd(start);
      } else {
        setEnd(cellDate);
      }
    } else {
      setStart(cellDate);
    }
  };

  useLayoutEffect(() => {
    console.log({ start, end });
  }, [start, end]);

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
          <HeaderColumn>
            <TableCell>Week {getWeek(selectedWeek)}</TableCell>
            {bookingIntervals.map(({ hours, minutes }) => {
              const dayForFormatting = set(new Date(), { hours, minutes });

              return (
                <HourHeaderCell
                  isHighlighted={
                    !!hoveredHour &&
                    dayForFormatting.getHours() === hoveredHour.getHours() &&
                    dayForFormatting.getMinutes() === hoveredHour.getMinutes()
                  }
                >
                  {format(dayForFormatting, 'HH:mm')}
                </HourHeaderCell>
              );
            })}
          </HeaderColumn>
          {weekTimeRanges?.map((weekdayOptions) => (
            <TableColumn key={weekdayOptions[0].getDay()}>
              <WeekdayHeaderCell>{format(weekdayOptions[0], 'eee d.MM.y')}</WeekdayHeaderCell>
              {weekdayOptions.map((day) => {
                const isSelected =
                  start === day ||
                  end === day ||
                  (start &&
                    !end &&
                    hoveredHour &&
                    isSameDay(start, day) &&
                    isSameDay(hoveredHour, day) &&
                    isBetween(day, [start, hoveredHour])) ||
                  (!!start && !!end && isBetween(day, [start, end]));
                return (
                  <TimeCell
                    key={day.getTime()}
                    ref={(ref) => ref && cells.set(day, ref)}
                    onClick={() => onCellClick(day)}
                    isSelected={isSelected}
                    isStart={start === day}
                    isEnd={end === day}
                    onMouseEnter={() => setHoveredHour(day)}
                    onMouseLeave={() => setHoveredHour(undefined)}
                  >
                    {start &&
                      hoveredHour &&
                      (isSameDay(start, hoveredHour)
                        ? sortDates([start, hoveredHour])[0]
                        : start) === day &&
                      (hoveredHour ?? end) &&
                      formatInterval(start, end ?? hoveredHour!)}
                  </TimeCell>
                );
              })}
            </TableColumn>
          ))}
        </Table>
      </Root>
    </>
  );
};

export default DeviceBooking;
