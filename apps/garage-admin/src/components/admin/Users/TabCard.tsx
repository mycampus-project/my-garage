import React, { useState } from 'react';
import { Card } from 'antd';

type TabList = {
  key: string;
  tab: string;
};

type BookingsElements = {
  [current: string]: JSX.Element;
  previous: JSX.Element;
};

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

const contentListNoTitle: BookingsElements = {
  current: <p>Current Bookings Content</p>,
  previous: <p>Previous Bookings Content</p>,
};

const TabsCard = () => {
  const [activeTabKey, setActiveTabKey] = useState('current');

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
        {contentListNoTitle[activeTabKey]}
      </Card>
    </>
  );
};

export default TabsCard;
