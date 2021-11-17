import { useState } from 'react';
import { Card } from 'antd';
import { BookingsElements, TabList } from '../../../types/adminTypes';
import { CurrentBooking, PreviousBooking } from '../../tests/testData';
import UserBookingsList from '../Users/UserBookingsList';
import DeviceBookingList from '../Devices/DeviceBookingList';

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
  current: <UserBookingsList data={CurrentBooking} />,
  previous: <UserBookingsList data={PreviousBooking} />,
};

const contentListDevice: BookingsElements = {
  current: <DeviceBookingList data={CurrentBooking} />,
  previous: <DeviceBookingList data={PreviousBooking} />,
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
