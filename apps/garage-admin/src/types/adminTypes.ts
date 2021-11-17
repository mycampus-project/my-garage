import { User, Thing } from '@my-garage/common';

export type BookingData = {
  user: User;
  thing: Thing;
  date: Date;
};

export type BookingsElements = {
  [current: string]: JSX.Element;
  previous: JSX.Element;
};

export type TabList = {
  key: string;
  tab: string;
};
