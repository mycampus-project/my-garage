import { Thing } from '@my-garage/common';
import { PageHeader } from 'antd';
import { groupBy } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import DeviceBooking from './DeviceBooking';
import DeviceListSection from './DeviceListSection';
import { thingsArray } from './testData';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CenteredLayout = styled.div`
  @media screen and (max-width: 992px) {
    padding: var(--padding-m);
  }
  display: flex;
  flex-direction: column;
  padding: var(--padding-xl);
  width: 100%;
  height: 100%;
  min-height: 0;
`;

const Left = styled.div<{ hasSelectedItem: boolean }>`
  overflow: auto;
  padding-top: 0;
`;

const Right = styled.div<{ hasSelectedItem: boolean }>`
  grid-column: 2;
  max-width: 100%;
  min-width: 0;
  overflow: auto;
`;

const Content = styled.div<{ hasSelectedItem: boolean }>`
  width: 100%;
  height: 100%;
  min-height: 0;

  background-color: white;

  display: grid;
  grid-template-columns: 30% auto;

  // Desktop XL and above
  @media (min-width: 1400px) {
    grid-template-columns: 20% auto;
  }

  // Small laptop and below
  @media (max-width: 992px) {
    grid-template-columns: ${({ hasSelectedItem }) => (hasSelectedItem ? '0 100%' : '100% 0')};
    ${Left} {
      ${({ hasSelectedItem }) => hasSelectedItem && 'display: none;'}
    }
    ${Right} {
      ${({ hasSelectedItem }) => !hasSelectedItem && 'display: none;'}
    }
  }
`;

const useItems = () => Object.entries(groupBy(thingsArray, (thing) => thing.type));

function NewBooking() {
  const [selectedItem, setSelectedItem] = useState<Thing | null>(null);
  const items = useItems();

  return (
    <Root>
      <PageHeader title="New booking" />
      <CenteredLayout>
        <Content hasSelectedItem={!!selectedItem}>
          <Left hasSelectedItem={!!selectedItem}>
            {items.map(([type, itemsOfType]) => (
              <DeviceListSection
                key={type}
                items={itemsOfType}
                onItemSelect={setSelectedItem}
                type={type}
                selectedItem={selectedItem}
              />
            ))}
          </Left>
          <Right hasSelectedItem={!!selectedItem}>
            {selectedItem && (
              <DeviceBooking thing={selectedItem} onBackClick={() => setSelectedItem(null)} />
            )}
          </Right>
        </Content>
      </CenteredLayout>
    </Root>
  );
}

export default NewBooking;
