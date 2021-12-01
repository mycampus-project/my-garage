import { useContext, useEffect, useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { AdminContext } from 'src/contexts/AdminContext';
import { useQueryClient } from 'react-query';
import { BookingsElements, TabList } from '../../../types/adminTypes';
import PaginationUserBookingsList from '../Users/PaginationUserBookingsList';
import PaginationDeviceBookingList from '../Devices/PaginationDeviceBookingsList';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const tabListNoTitle: TabList[] = [
  {
    key: 'future',
    tab: 'Current Bookings',
  },
  {
    key: 'past',
    tab: 'Previous Bookings',
  },
];

interface BookingsTabsCardProps {
  showThings?: boolean;
}
const defaultProps = {
  showThings: false,
};

const BookingsTabsCard = ({ showThings }: BookingsTabsCardProps) => {
  const client = useQueryClient();
  const [activeTabKey, setActiveTabKey] = useState('future');
  const { selectedThing } = useContext(AdminContext);

  useEffect(() => {
    client.invalidateQueries('futureThingBookings');
  }, [client]);

  // Change display dependent on tab selected
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const contentListUsers: BookingsElements = {
    future: <PaginationUserBookingsList mode="future" />,
    past: <PaginationUserBookingsList mode="past" />,
  };

  const contentListDevice: BookingsElements = {
    future: <PaginationDeviceBookingList mode="future" thingId={selectedThing.id} />,
    past: <PaginationDeviceBookingList mode="past" thingId={selectedThing.id} />,
  };

  return (
    <StyledCard
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      onTabChange={(key: string) => {
        onTabChange(key);
      }}
    >
      {showThings ? contentListDevice[activeTabKey] : contentListUsers[activeTabKey]}
    </StyledCard>
  );
};

BookingsTabsCard.defaultProps = defaultProps;

export default BookingsTabsCard;
