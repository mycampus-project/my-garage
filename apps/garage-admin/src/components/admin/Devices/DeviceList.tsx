import 'antd/dist/antd.css';
import { List } from 'antd';
import useThing from 'src/hooks/useThing';
import { useLocalStorage, Thing } from '@my-garage/common';
import { useEffect, useState } from 'react';
import DeviceListItem from './DeviceListItem';

const DeviceList = () => {
  const [token] = useLocalStorage('auth_token');
  const { data, error, isLoading } = useThing().GetListOfThings(token);
  const [filteredData, setFilteredData] = useState<Thing[]>([]);

  const sortedByNameAlphabetically = (dataArray: Thing[]) => {
    function compareByName(a: Thing, b: Thing) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    return dataArray.sort(compareByName);
  };

  useEffect(() => {
    const sortedData = data ? sortedByNameAlphabetically(data.data) : new Array<Thing>();
    const filteredArray = sortedData.filter((item: Thing) => item.removedBy === undefined);
    setFilteredData(filteredArray);
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <List
      data-testid="deviceList"
      loading={isLoading}
      style={{ width: '100%' }}
      dataSource={filteredData}
      renderItem={(item) => <DeviceListItem item={item} />}
    />
  );
};

export default DeviceList;
