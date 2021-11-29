import { User, Thing } from '@my-garage/common';
import { FormInstance } from 'antd';

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

export type ValidationValueTypes = {
  name: string;
  description: string;
  upload: string;
  type: string;
  isAvailable: boolean;
};

export type AddDeviceFormProps = {
  form: FormInstance;
  showEdit?: boolean;
};

export type UserSorted = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: Date;
  removedAt?: Date;
  removedBy?: User;
  surname: string;
};
