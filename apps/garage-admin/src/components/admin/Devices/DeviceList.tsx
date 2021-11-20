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

  const sortedArray = (dataArray: Thing[]) => {
    function compareByType(a: Thing, b: Thing) {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0;
    }

    return dataArray.sort(compareByType);
  };

  useEffect(() => {
    const sortedData = data ? sortedArray(data.data) : new Array<Thing>();
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
