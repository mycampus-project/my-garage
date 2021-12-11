import { useContext, useEffect, useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { AdminContext } from 'src/contexts/AdminContext';
import { useQueryClient } from 'react-query';
import { BookingsElements, TabList } from '../../../types/adminTypes';
import PaginationDeviceBookingList from '../Devices/PaginationDeviceBookingsList';
import PaginationUserBookingsList from '../Users/PaginationUserBookingsList';
import openNotificationWithIcon from './OpenNotificationWithIcon';

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
  const { selectedThing, selectedUser } = useContext(AdminContext);

  useEffect(() => {
    client.invalidateQueries('futureThingBookings');
  }, [client]);

  if (selectedThing === null) {
    openNotificationWithIcon('error', 'SelectedThing Error', 'Selected Device return null');
    return <div>Error</div>;
  }

  if (selectedUser === null) {
    openNotificationWithIcon('error', 'SelectedUser Error', 'Selected User return null');
    return <div>Error</div>;
  }

  // Change display dependent on tab selected
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const contentListUsers: BookingsElements = {
    future: <PaginationUserBookingsList mode={activeTabKey} userId={selectedUser.id} />,
    past: <PaginationUserBookingsList mode={activeTabKey} userId={selectedUser.id} />,
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
