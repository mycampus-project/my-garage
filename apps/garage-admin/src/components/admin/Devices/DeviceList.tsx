import 'antd/dist/antd.css';
import useThing from 'src/hooks/useThing';
import { groupBy } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { Thing } from '@my-garage/common';
import { Spin } from 'antd';
import { AdminContext } from 'src/contexts/AdminContext';
import sortedThingArray from 'src/utilities/utilityFunctions';
import DeviceListSection from './DeviceListSection';

const searchList = (searchValue: string, array: Thing[]) => {
  const searchResult = array.filter((item) => {
    if (
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.type.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return item;
    }
    return false;
  });

  return searchResult;
};

const DeviceList = () => {
  const { searchValue } = useContext(AdminContext);
  const { data, error, isLoading } = useThing().GetListOfThings();
  const [filteredData, setFilteredData] = useState<Thing[]>([]);
  const groupedItems = filteredData && Object.entries(groupBy(filteredData, (thing) => thing.type));

  useEffect(() => {
    const filteredArray = data
      ? data.data.filter((item: Thing) => item.removedBy === undefined)
      : new Array<Thing>();

    if (searchValue === '') {
      setFilteredData(sortedThingArray(filteredArray, 'type'));
    }
    if (searchValue !== '') {
      setFilteredData(searchList(searchValue, sortedThingArray(filteredArray, 'type')));
    }
  }, [data, searchValue]);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      {groupedItems?.map(([type, itemsOfType]) => (
        <DeviceListSection key={type} items={itemsOfType} type={type} />
      ))}
    </>
  );
};

export default DeviceList;
