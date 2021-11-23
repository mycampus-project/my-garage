import {
  addMinutes,
  format,
  getWeek,
  isBefore,
  isEqual,
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
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { TableCell } from './common';
import TimeCell from './TimeCell';

const Root = styled.div`
  padding: var(--padding-m);
`;

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

const isBetweenInclusive = (date: Date, interval: [Date, Date]) => {
  const [start, end] = sortDates(interval);

  return isWithinInterval(date, { start, end });
};

const formatInterval = (a: Date, b: Date) => {
  const [start, end] = sortDates([a, b]);

  return `${format(start, 'HH:mm')}-${format(end, 'HH:mm')}`;
};

// const formatSelectedInterval = (start: Date | undefined, end: Date | undefined, hoveredHour: Date, )

const isBeforeOrEqual = (date: Date, dateToCompare: Date) =>
  isEqual(date, dateToCompare) || isBefore(date, dateToCompare);

const doDateRangesOverlap = (range1: [Date, Date], range2: [Date, Date]) => {
  const [x1, y1] = sortDates(range1);
  const [x2, y2] = sortDates(range2);

  return (
    !isBeforeOrEqual(sortDates([x1, y1])[1], sortDates([x2, y2])[0]) &&
    !isBeforeOrEqual(sortDates([x2, y2])[1], sortDates([x1, y1])[0])
  );
};

const isValidInterval = ([a, b]: [Date, Date], existingBookings: Array<[Date, Date]>) => {
  if (!isSameDay(a, b)) return false;

  return !existingBookings.some(([startAt, endAt]) =>
    doDateRangesOverlap([a, b], [startAt, endAt]),
  );
};

const useBookingsForWeek = (week: Date): Array<{ startAt: Date; endAt: Date }> => [
  {
    endAt: set(setDay(week, 1), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }),
    startAt: set(setDay(week, 1), { hours: 11, minutes: 0, seconds: 0, milliseconds: 0 }),
  },
];

const calculateStartEnd = (a: Date, b: Date) => {
  const [startAt, endCellStart] = sortDates([a, b]);

  const endAt = addMinutes(endCellStart, 30);

  return { startAt, endAt };
};

interface Props {
  thing: Thing;
  onBackClick: () => void;
}

const DeviceBooking = ({ thing, onBackClick }: Props) => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(getInitialWeekValue());

  const [hoveredCell, setHoveredCell] = useState<Date>();

  const [selectedInterval, setSelectedInterval] = useState<{
    startAt: Date | null;
    endAt: Date | null;
  }>({ startAt: null, endAt: null });
  const bookingsForWeek = useBookingsForWeek(selectedWeek);

  const highlightedInterval = useMemo((): { startAt: Date | null; endAt: Date | null } => {
    if (!selectedInterval.startAt || !hoveredCell || selectedInterval.endAt || !bookingsForWeek)
      return { startAt: null, endAt: null };

    const { startAt, endAt } = calculateStartEnd(selectedInterval.startAt, hoveredCell);

    if (
      !isValidInterval(
        [startAt, endAt],
        bookingsForWeek.map(({ startAt: start, endAt: end }) => [start, end]),
      )
    ) {
      return { startAt: null, endAt: null };
    }

    return { startAt, endAt };
  }, [selectedInterval, hoveredCell, bookingsForWeek]);

  const bookingIntervals = useMemo(() => getBookingIntervals(9, 18), []);
  const weekdays = useMemo(() => createWeekdaysForWeek(selectedWeek), [selectedWeek]);
  const weekTimeRanges = useMemo(
    () => createTimeRanges(weekdays, bookingIntervals),
    [weekdays, bookingIntervals],
  );

  const onCellClick = (cellDate: Date) => {
    if (
      selectedInterval.startAt &&
      !selectedInterval.endAt &&
      isSameDay(selectedInterval.startAt, cellDate)
    ) {
      const { startAt, endAt } = calculateStartEnd(selectedInterval.startAt, cellDate);

      if (
        isValidInterval(
          [startAt, endAt],
          bookingsForWeek.map(({ startAt: start, endAt: end }) => [start, end]),
        )
      ) {
        setSelectedInterval({ startAt, endAt });
        return;
      }
    }

    setSelectedInterval({ startAt: cellDate, endAt: null });
  };

  const getIsTableCellSelected = (cellDate: Date) => {
    const { startAt, endAt } = selectedInterval;
    if (!startAt || !endAt) return false;

    return isBetweenInclusive(cellDate, [startAt, endAt]) && !isEqual(cellDate, endAt);
  };

  const getIsTableCellHighlighted = (cellDate: Date) => {
    const { startAt, endAt } = highlightedInterval;

    if (!startAt || !endAt) return false;

    return isBetweenInclusive(cellDate, [startAt, endAt]) && !isEqual(cellDate, endAt);
  };

  const getIsTableCellUnavailable = (cellDate: Date) =>
    bookingsForWeek.some(
      ({ startAt, endAt }) =>
        isWithinInterval(cellDate, { start: startAt!, end: endAt! }) &&
        !isSameMinute(cellDate, endAt),
    );

  const getTimeCellText = (cellDate: Date) => {
    const { startAt, endAt } = selectedInterval;

    if (startAt && endAt && isEqual(startAt, cellDate)) {
      return formatInterval(startAt, endAt);
    }

    const { startAt: startHighlighted, endAt: endHighlighted } = highlightedInterval;

    if (startHighlighted && endHighlighted && isEqual(startHighlighted, cellDate)) {
      return formatInterval(startHighlighted, endHighlighted);
    }

    return undefined;
  };

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
        <Table>
          <HeaderColumn>
            <TableCell>Week {getWeek(selectedWeek)}</TableCell>
            {bookingIntervals.map(({ hours, minutes }) => {
              const dayForFormatting = set(new Date(), { hours, minutes });

              return (
                <HourHeaderCell
                  isHighlighted={
                    !!hoveredCell &&
                    dayForFormatting.getHours() === hoveredCell.getHours() &&
                    dayForFormatting.getMinutes() === hoveredCell.getMinutes()
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
              {weekdayOptions.map((date) => (
                <TimeCell
                  key={date.getTime()}
                  date={date}
                  onClick={onCellClick}
                  isSelected={getIsTableCellSelected(date)}
                  isHighlighted={getIsTableCellHighlighted(date)}
                  isUnavailable={getIsTableCellUnavailable(date)}
                  onMouseEnter={setHoveredCell}
                  onMouseLeave={() => setHoveredCell(undefined)}
                >
                  {getTimeCellText(date)}
                </TimeCell>
              ))}
            </TableColumn>
          ))}
        </Table>
      </Root>
    </>
  );
};

export default DeviceBooking;
