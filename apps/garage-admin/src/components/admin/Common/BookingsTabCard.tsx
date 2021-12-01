import { useContext, useEffect, useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { AdminContext } from 'src/contexts/AdminContext';
import { useQueryClient } from 'react-query';
import { BookingsElements, TabList } from '../../../types/adminTypes';
import PaginationDeviceBookingList from '../Devices/PaginationDeviceBookingsList';
import PaginationUserBookingsList from '../Users/PaginationUserBookingsList';

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
    future: <PaginationUserBookingsList mode={activeTabKey} />,
    past: <PaginationUserBookingsList mode={activeTabKey} />,
  };

  const contentListDevice: BookingsElements = {
    future: <PaginationDeviceBookingList mode={activeTabKey} thingId={selectedThing.id} />,
    past: <PaginationDeviceBookingList mode={activeTabKey} thingId={selectedThing.id} />,
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
