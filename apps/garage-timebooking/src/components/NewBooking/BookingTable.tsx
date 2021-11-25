import { useState } from 'react';
import {
  addMinutes,
  differenceInMinutes,
  format,
  isBefore,
  isEqual,
  isSameDay,
  isSameMinute,
  isWithinInterval,
  subMinutes,
} from 'date-fns';

import useWeekDateCells from './useWeekDateCells';
import {
  isValidRange,
  sortDates,
  Interval,
  isBetweenInclusive,
  dateSortComparator,
  isBeforeOrEqual,
  isAfterOrEqual,
} from './utils';
import Table from './Table';

type NullableInterval = {
  startAt: Date | null;
  endAt: Date | null;
};

const calculateStartEnd = (a: Date, b: Date, timeUnitMinutes: number) => {
  const [startAt, endCellStart] = sortDates([a, b]);

  const endAt = addMinutes(endCellStart, timeUnitMinutes);

  return { startAt, endAt };
};

const formatInterval = ({ startAt, endAt }: Interval) =>
  `${format(startAt, 'HH:mm')}-${format(endAt, 'HH:mm')}`;

const findClosestIntervalEnd = (
  fromDate: Date,
  occupiedIntervals: Interval[],
  direction: 1 | -1,
) => {
  if (direction === 1) {
    const intervalStartTimes = occupiedIntervals
      .map(({ startAt }) => startAt)
      .filter((date) => isSameDay(fromDate, date))
      .sort(dateSortComparator);

    return intervalStartTimes.find((date) => isAfterOrEqual(date, fromDate));
  }

  const intervalEndTimes = occupiedIntervals
    .map(({ endAt }) => endAt)
    .filter((date) => isSameDay(fromDate, date))
    .sort(dateSortComparator)
    .reverse();

  return intervalEndTimes.find((date) => isBeforeOrEqual(date, fromDate));
};

const useHighlightedInterval = (
  hoveredCell: Date | null,
  selectedInterval: NullableInterval,
  occupiedIntervals: Interval[],
  timeUnit: number,
  maxIntervalLengthMinutes: number,
) => {
  if (!selectedInterval.startAt || !hoveredCell || selectedInterval.endAt || !occupiedIntervals)
    return { startAt: null, endAt: null };

  const { startAt, endAt } = calculateStartEnd(selectedInterval.startAt, hoveredCell, timeUnit);

  if (isValidRange([startAt, endAt], occupiedIntervals, maxIntervalLengthMinutes)) {
    return { startAt, endAt };
  }

  if (!isSameDay(selectedInterval.startAt, hoveredCell)) {
    return { startAt: null, endAt: null };
  }

  // Calculate longest uninterrupted interval
  const direction = isBefore(selectedInterval.startAt, hoveredCell) ? 1 : -1;

  const hoveredIntervalDuration = Math.abs(differenceInMinutes(startAt, endAt));

  if (
    isValidRange([startAt, endAt], occupiedIntervals) &&
    hoveredIntervalDuration > maxIntervalLengthMinutes
  ) {
    const maxAllowedEndTime = addMinutes(
      selectedInterval.startAt,
      (maxIntervalLengthMinutes - timeUnit) * direction,
    );
    return calculateStartEnd(selectedInterval.startAt, maxAllowedEndTime, timeUnit);
  }

  const end = findClosestIntervalEnd(selectedInterval.startAt, occupiedIntervals, direction);

  if (end) {
    return calculateStartEnd(
      selectedInterval.startAt,
      direction === 1 ? subMinutes(end, timeUnit) : end,
      timeUnit,
    );
  }

  return { startAt: null, endAt: null };
};

interface Props {
  selectedWeek: Date;
  occupiedIntervals: Interval[];
  startHour: number;
  endHour: number;
  timeUnit: 10 | 15 | 30 | 60;
  maxBookingLengthMinutes: number;
}

const BookingTable = ({
  selectedWeek,
  occupiedIntervals,
  startHour,
  endHour,
  timeUnit,
  maxBookingLengthMinutes,
}: Props) => {
  const [hoveredCell, setHoveredCell] = useState<Date | null>(null);
  const weekDateCells = useWeekDateCells(selectedWeek, startHour, endHour, timeUnit);

  const [selectedInterval, setSelectedInterval] = useState<NullableInterval>({
    startAt: null,
    endAt: null,
  });

  const highlightedInterval = useHighlightedInterval(
    hoveredCell,
    selectedInterval,
    occupiedIntervals,
    timeUnit,
    maxBookingLengthMinutes,
  );

  const onCellClick = (cellDate: Date) => {
    if (
      selectedInterval.startAt &&
      !selectedInterval.endAt &&
      isSameDay(selectedInterval.startAt, cellDate)
    ) {
      const { startAt, endAt } = calculateStartEnd(selectedInterval.startAt, cellDate, timeUnit);

      if (isValidRange([startAt, endAt], occupiedIntervals, maxBookingLengthMinutes)) {
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
    occupiedIntervals.some(
      ({ startAt, endAt }) =>
        isWithinInterval(cellDate, { start: startAt!, end: endAt! }) &&
        !isSameMinute(cellDate, endAt),
    );

  const getTimeCellText = (cellDate: Date) => {
    if (
      selectedInterval.startAt &&
      selectedInterval.endAt &&
      isEqual(selectedInterval.startAt, cellDate)
    ) {
      return formatInterval(selectedInterval as Interval);
    }

    const { startAt: startHighlighted, endAt: endHighlighted } = highlightedInterval;

    if (startHighlighted && endHighlighted && isEqual(startHighlighted, cellDate)) {
      return formatInterval(highlightedInterval);
    }

    return null;
  };

  return (
    <Table
      dateCells={weekDateCells}
      onCellClick={onCellClick}
      onHoveredCellChange={setHoveredCell}
      getIsTableCellSelected={getIsTableCellSelected}
      getIsTableCellHighlighted={getIsTableCellHighlighted}
      getIsTableCellUnavailable={getIsTableCellUnavailable}
      getIsTableCellInvalid={(cellDate) =>
        getIsTableCellHighlighted(cellDate) &&
        !!hoveredCell &&
        !isWithinInterval(hoveredCell, {
          start: highlightedInterval.startAt!,
          end: subMinutes(highlightedInterval.endAt!, timeUnit),
        })
      }
      getTimeCellText={getTimeCellText}
    />
  );
};

export default BookingTable;
