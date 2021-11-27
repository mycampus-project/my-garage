import { useState } from 'react';
import {
  addMinutes,
  differenceInMinutes,
  format,
  formatDuration,
  intervalToDuration,
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
  isInFuture,
  getEarliestStart,
} from './utils';
import Table from './Table';
import ErrorTooltip from './ErrorTooltip';

type NullableInterval = {
  start: Date | null;
  end: Date | null;
};

const calculateStartEnd = (a: Date, b: Date, timeUnitMinutes: number) => {
  const [start, endCellStart] = sortDates([a, b]);

  const end = addMinutes(endCellStart, timeUnitMinutes);

  return { start, end };
};

const formatInterval = ({ start, end }: Interval) => {
  if (isSameDay(start, end)) {
    return `${format(start, 'HH:mm')}-${format(end, 'HH:mm')}`;
  }

  return `${format(start, 'eee HH:mm')}-${format(end, 'eee HH:mm')}`;
};

const findClosestIntervalEnd = (
  fromDate: Date,
  occupiedIntervals: Interval[],
  direction: 1 | -1,
) => {
  if (direction === 1) {
    const intervalStartTimes = occupiedIntervals.map(({ start }) => start).sort(dateSortComparator);

    return intervalStartTimes.find((date) => isAfterOrEqual(date, fromDate));
  }

  const intervalEndTimes = occupiedIntervals
    .map(({ end }) => end)
    .sort(dateSortComparator)
    .reverse();

  return intervalEndTimes.find((date) => isBeforeOrEqual(date, fromDate));
};

const useHighlightedInterval = (
  hoveredCell: Date | null,
  selectedInterval: NullableInterval,
  occupiedIntervals: Interval[],
  durationUnitMin: number,
  maxIntervalLengthMinutes: number,
): {
  error: string | null;
  highlightedInterval: NullableInterval;
  validInterval: NullableInterval;
} => {
  if (!selectedInterval.start || !hoveredCell || selectedInterval.end || !occupiedIntervals)
    return {
      error: null,
      validInterval: { start: null, end: null },
      highlightedInterval: { start: null, end: null },
    };

  const { start, end } = calculateStartEnd(selectedInterval.start, hoveredCell, durationUnitMin);

  const highlightedInterval = { start, end };

  if (isValidRange([start, end], occupiedIntervals, maxIntervalLengthMinutes)) {
    return {
      error: null,
      highlightedInterval: { start, end },
      validInterval: highlightedInterval,
    };
  }

  const direction = isBefore(selectedInterval.start, hoveredCell) ? 1 : -1;

  const closestEnd = findClosestIntervalEnd(selectedInterval.start, occupiedIntervals, direction);

  // Is there an existing booking inside hovered interval, that is shorter than max allowed?
  if (
    closestEnd &&
    Math.abs(differenceInMinutes(direction === 1 ? start : end, closestEnd)) <
      maxIntervalLengthMinutes
  ) {
    return {
      error: 'Interval overlaps with existing bookings',
      highlightedInterval,
      validInterval: calculateStartEnd(
        selectedInterval.start,
        direction === 1 ? subMinutes(closestEnd, durationUnitMin) : closestEnd,
        durationUnitMin,
      ),
    };
  }
  const hoveredIntervalDuration = Math.abs(differenceInMinutes(start, end));

  // Is interval longer than allowed?
  if (hoveredIntervalDuration > maxIntervalLengthMinutes) {
    // Calculate longest uninterrupted interval
    const maxAllowedEndTime = addMinutes(
      selectedInterval.start,
      (maxIntervalLengthMinutes - durationUnitMin) * direction,
    );

    return {
      error: `Interval longer than ${formatDuration(
        intervalToDuration({ start: 0, end: maxIntervalLengthMinutes * 60 * 1000 }),
      )}`,
      highlightedInterval,
      validInterval: calculateStartEnd(selectedInterval.start, maxAllowedEndTime, durationUnitMin),
    };
  }

  if (!isInFuture(start, durationUnitMin)) {
    const earliestStart = getEarliestStart(durationUnitMin);

    return {
      error: `Earliest allowed start for a booking is ${format(earliestStart, 'eee HH:mm')}`,
      highlightedInterval,
      validInterval: {
        start: earliestStart,
        end,
      },
    };
  }

  return { error: null, highlightedInterval, validInterval: { start, end } };
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
    start: null,
    end: null,
  });

  const { highlightedInterval, validInterval, error } = useHighlightedInterval(
    hoveredCell,
    selectedInterval,
    occupiedIntervals,
    timeUnit,
    maxBookingLengthMinutes,
  );

  const onCellClick = (cellDate: Date) => {
    if (selectedInterval.start && !selectedInterval.end && !error) {
      setSelectedInterval(highlightedInterval);
    } else {
      setSelectedInterval({ start: cellDate, end: null });
    }
  };

  const getIsTableCellSelected = (cellDate: Date) => {
    const { start, end } = selectedInterval;
    if (!start || !end) return false;

    return isBetweenInclusive(cellDate, [start, end]) && !isEqual(cellDate, end);
  };

  const getIsTableCellHighlighted = (cellDate: Date) => {
    const { start, end } = highlightedInterval;

    if (!start || !end) return false;

    return isBetweenInclusive(cellDate, [start, end]) && !isEqual(cellDate, end);
  };

  const getIsTableCellUnavailable = (cellDate: Date) =>
    !isInFuture(cellDate, timeUnit) ||
    occupiedIntervals.some(
      ({ start, end }) =>
        isWithinInterval(cellDate, { start: start!, end: end! }) && !isSameMinute(cellDate, end),
    );

  const getTimeCellText = (cellDate: Date) => {
    if (
      selectedInterval.start &&
      selectedInterval.end &&
      isEqual(selectedInterval.start, cellDate)
    ) {
      return formatInterval(selectedInterval as Interval);
    }

    const { start: startHighlighted, end: endHighlighted } = highlightedInterval;

    if (startHighlighted && endHighlighted && isEqual(startHighlighted, cellDate)) {
      return formatInterval(highlightedInterval as Interval);
    }

    return null;
  };

  return (
    <>
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
          !!validInterval.start &&
          !!validInterval.end &&
          !(
            isWithinInterval(cellDate, validInterval as Interval) &&
            !isSameMinute(cellDate, validInterval.end)
          )
        }
        getTimeCellText={getTimeCellText}
      />
      {error && <ErrorTooltip error={error} />}
    </>
  );
};

export default BookingTable;
