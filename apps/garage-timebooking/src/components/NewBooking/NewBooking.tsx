import React from 'react';
import { groupBy } from 'lodash';
import DeviceBooking from './DeviceBooking';
import useDevices from './useDevices';
import Layout from '../common/Layout';
import ListItem from '../common/ListItem';

function NewBooking() {
  const { data, isLoading } = useDevices();

  const groupedItems = data ? groupBy(data, (thing) => thing.type) : null;

  return (
    <Layout
      isLoadingList={isLoading}
      listSections={groupedItems}
      pageTitle="New booking"
      renderContent={(selectedItem, clearSelection) =>
        selectedItem && <DeviceBooking thing={selectedItem} onBackClick={clearSelection} />
      }
      renderItem={(item, isSelected, onClick) => (
        <ListItem
          title={item.name}
          description={item.description}
          onClick={onClick}
          isSelected={isSelected}
          isDisabled={!item.isAvailable}
          imageUrl={item.imageUrl}
        />
      )}
    />
  );
}

export default NewBooking;
