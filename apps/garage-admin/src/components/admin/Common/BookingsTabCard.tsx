import { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { BookingsElements, TabList } from '../../../types/adminTypes';
import { CurrentBooking, PreviousBooking } from '../../tests/testData';
import UserBookingsList from '../Users/UserBookingsList';
import PaginationDeviceList from '../Devices/PaginationDeviceBookingsList';

const StyledCard = styled(Card)`
  width: 100%;
  height: 500px;
`;

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
  current: <PaginationDeviceList data={CurrentBooking} />,
  previous: <PaginationDeviceList data={PreviousBooking} />,
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
    <StyledCard
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      onTabChange={(key: string) => {
        onTabChange(key);
      }}
    >
      {things ? contentListDevice[activeTabKey] : contentListUsers[activeTabKey]}
    </StyledCard>
  );
};

BookingsTabsCard.defaultProps = defaultProps;

export default BookingsTabsCard;
