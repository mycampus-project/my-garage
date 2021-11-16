import { useState } from 'react';
import { Card } from 'antd';
import { User } from '@my-garage/common';
import BookingsList from './BookingsList';

type TabList = {
  key: string;
  tab: string;
};

type BookingsElements = {
  [current: string]: JSX.Element;
  previous: JSX.Element;
};

type BookingData = {
  title: string;
  date: Date;
  user: User;
};

const defaultUser: User = {
  id: '1',
  fullName: 'Fred Jones',
  email: 'fredjones@fake.com',
  role: 'User',
  createdAt: new Date('05/31/2021 14:03:28'),
};

const currentBooking: BookingData[] = [
  {
    title: 'Media Room',
    date: new Date('October 13, 2014 11:13:00'),
    user: defaultUser,
  },
  {
    title: '3D Printer',
    date: new Date('October 13, 2014 11:13:00'),
    user: defaultUser,
  },
  {
    title: 'VR Headset',
    date: new Date('October 13, 2014 11:13:00'),
    user: defaultUser,
  },
  {
    title: 'Raspberry Pi',
    date: new Date('October 13, 2014 11:13:00'),
    user: defaultUser,
  },
];

const previousBooking: BookingData[] = [
  {
    title: 'Meeting Room',
    date: new Date('October 13, 2014 11:13:00'),
    user: defaultUser,
  },
  {
    title: '3D Printer',
    date: new Date('October 13, 2014 11:13:00'),
    user: defaultUser,
  },
  {
    title: '3D Printer',
    date: new Date('October 13, 2014 11:13:00'),
    user: defaultUser,
  },
  {
    title: 'VR Headset',
    date: new Date('October 13, 2014 11:13:00'),
    user: defaultUser,
  },
];

const tabListNoTitle: TabList[] = [
  {
    key: 'current',
    tab: 'Current Bookings',
  },
  {
    key: 'previous',
    tab: 'Previous Bookings',
  },
];

const contentListUsers: BookingsElements = {
  current: <BookingsList data={currentBooking} things={false} />,
  previous: <BookingsList data={previousBooking} things={false} />,
};

const contentListDevice: BookingsElements = {
  current: <BookingsList data={currentBooking} things />,
  previous: <BookingsList data={previousBooking} things />,
};

interface BookingsTabsCardProps {
  things?: boolean;
}
const defaultProps = {
  things: false,
};

const BookingsTabsCard = ({ things }: BookingsTabsCardProps) => {
  const [activeTabKey, setActiveTabKey] = useState('current');

  // Change display dependent on tab selected
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={(key: string) => {
          onTabChange(key);
        }}
      >
        {things ? contentListDevice[activeTabKey] : contentListUsers[activeTabKey]}
      </Card>
    </>
  );
};

BookingsTabsCard.defaultProps = defaultProps;

export default BookingsTabsCard;
