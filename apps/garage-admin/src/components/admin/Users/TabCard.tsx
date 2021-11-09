import React, { useState } from 'react';
import { Card } from 'antd';

type TabList = {
  key: string;
  tab: string;
};

type TabElements = {
  [article: string]: JSX.Element;
  app: JSX.Element;
};

const tabListNoTitle: TabList[] = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
];

const contentListNoTitle: TabElements = {
  article: <p>article content</p>,
  app: <p>app content</p>,
};

const TabsCard = () => {
  const [activeTabKey, setActiveTabKey] = useState('article');

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
