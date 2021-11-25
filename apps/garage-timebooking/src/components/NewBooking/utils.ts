import {
  differenceInMinutes,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameMinute,
  isWithinInterval,
} from 'date-fns';

export type Interval = {
  startAt: Date;
  endAt: Date;
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

export const toRange = ({ startAt, endAt }: Interval): Range => [startAt, endAt];
export const toInterval = (range: Range): Interval => {
  const [startAt, endAt] = sortDates(range);

  return {
    startAt,
    endAt,
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

export const isValidRange = (
  range: Range,
  existingBookings: Array<Interval>,
  maxRangeDurationMin?: number,
) => {
  if (
    !isSameDay(...range) ||
    (maxRangeDurationMin && Math.abs(differenceInMinutes(...range)) > maxRangeDurationMin)
  ) {
    return false;
  }

  return !existingBookings.some((bookingInterval) =>
    doDateRangesOverlap(range, toRange(bookingInterval)),
  );
};
