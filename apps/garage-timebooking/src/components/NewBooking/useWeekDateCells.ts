import { set, setDay } from 'date-fns';
import { useMemo } from 'react';

const getBookingStartTimes = (startHour: number, endHour: number, timeUnit: number) => {
  const diff = endHour - startHour;

  const slotsInHour = 60 / timeUnit;

  return new Array(diff).fill(null).flatMap((_, index) =>
    new Array(slotsInHour).fill(null).map((_2, index2) => ({
      hours: startHour + index,
      minutes: timeUnit * index2,
    })),
  );
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

const useWeekDateCells = (
  selectedWeek: Date,
  startHour: number,
  endHour: number,
  timeUnit: number,
) => {
  const bookingStartTimes = useMemo(
    () => getBookingStartTimes(startHour, endHour, timeUnit),
    [startHour, endHour, timeUnit],
  );
  const weekdays = useMemo(() => createWeekdaysForWeek(selectedWeek), [selectedWeek]);

  const weekDateCells = useMemo(
    () => createTimeRanges(weekdays, bookingStartTimes),
    [weekdays, bookingStartTimes],
  );

  return weekDateCells;
};

export default useWeekDateCells;
