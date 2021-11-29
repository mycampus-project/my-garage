import {
  areIntervalsOverlapping,
  differenceInMinutes,
  isAfter,
  isBefore,
  isEqual,
  isSameMinute,
  isWithinInterval,
  set,
  setMinutes,
} from 'date-fns';

export type Interval = {
  start: Date;
  end: Date;
};

/**
 * Unsorted pair of dates
 */
export type Range = [Date, Date];

export const dateSortComparator = (a: Date, b: Date) => {
  if (isSameMinute(a, b)) {
    return 0;
  }
  return isBefore(a, b) ? -1 : 1;
};

export const sortDates = (dates: Date[]) => dates.sort(dateSortComparator);

export const toRange = ({ start, end }: Interval): Range => [start, end];
export const toInterval = (range: Range): Interval => {
  const [start, end] = sortDates(range);

  return {
    start,
    end,
  };
};

export const isBetweenInclusive = (date: Date, range: Range) => {
  const [start, end] = sortDates(range);

  return isWithinInterval(date, { start, end });
};

export const isBeforeOrEqual = (date: Date, dateToCompare: Date) =>
  isEqual(date, dateToCompare) || isBefore(date, dateToCompare);

export const isAfterOrEqual = (date: Date, dateToCompare: Date) =>
  isEqual(date, dateToCompare) || isAfter(date, dateToCompare);

export const doDateRangesOverlap = (range1: Range, range2: Range) => {
  const [x1, y1] = sortDates(range1);
  const [x2, y2] = sortDates(range2);

  return (
    !isBeforeOrEqual(sortDates([x1, y1])[1], sortDates([x2, y2])[0]) &&
    !isBeforeOrEqual(sortDates([x2, y2])[1], sortDates([x1, y1])[0])
  );
};

export const floorToNearestMinutes = (date: Date, nearestTo: number) => {
  const minutes = date.getMinutes();
  const flooredMinutes = Math.floor(minutes / nearestTo) * nearestTo;

  return setMinutes(date, flooredMinutes);
};

export const normalizeDate = (date: Date) => set(date, { seconds: 0, milliseconds: 0 });

export const isInFuture = (date: Date, durationUnitMin: number) => {
  const now = normalizeDate(new Date());

  const flooredNow = floorToNearestMinutes(now, durationUnitMin);

  return isAfterOrEqual(date, flooredNow);
};

export const getEarliestStart = (durationUnitMin: number) => {
  const now = normalizeDate(new Date());

  return floorToNearestMinutes(now, durationUnitMin);
};

export const isValidRange = (
  range: Range,
  existingBookings: Array<Interval>,
  maxRangeDurationMin?: number,
) => {
  if (maxRangeDurationMin && Math.abs(differenceInMinutes(...range)) > maxRangeDurationMin) {
    return false;
  }

  return !existingBookings.some((bookingInterval) =>
    areIntervalsOverlapping(toInterval(range), bookingInterval),
  );
};
