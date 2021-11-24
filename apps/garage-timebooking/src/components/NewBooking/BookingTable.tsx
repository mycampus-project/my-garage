import { useMemo, useState } from 'react';
import { addMinutes, format, isEqual, isSameDay, isSameMinute, isWithinInterval } from 'date-fns';

import useWeekDateCells from './useWeekDateCells';
import { isValidRange, sortDates, Interval, isBetweenInclusive } from './utils';
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

const useHighlightedInterval = (
  hoveredCell: Date | null,
  selectedInterval: NullableInterval,
  occupiedIntervals: Interval[],
  timeUnit: number,
) =>
  useMemo(() => {
    if (!selectedInterval.startAt || !hoveredCell || selectedInterval.endAt || !occupiedIntervals)
      return { startAt: null, endAt: null };

    const { startAt, endAt } = calculateStartEnd(selectedInterval.startAt, hoveredCell, timeUnit);

    if (!isValidRange([startAt, endAt], occupiedIntervals)) {
      return { startAt: null, endAt: null };
    }

    return { startAt, endAt };
  }, [selectedInterval, hoveredCell, occupiedIntervals, timeUnit]);

interface Props {
  selectedWeek: Date;
  occupiedIntervals: Interval[];
  startHour: number;
  endHour: number;
  timeUnit: 10 | 15 | 30 | 60;
}

const BookingTable = ({ selectedWeek, occupiedIntervals, startHour, endHour, timeUnit }: Props) => {
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
  );

  const onCellClick = (cellDate: Date) => {
    if (
      selectedInterval.startAt &&
      !selectedInterval.endAt &&
      isSameDay(selectedInterval.startAt, cellDate)
    ) {
      const { startAt, endAt } = calculateStartEnd(selectedInterval.startAt, cellDate, timeUnit);

      if (isValidRange([startAt, endAt], occupiedIntervals)) {
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
      getTimeCellText={getTimeCellText}
    />
  );
};

export default BookingTable;
