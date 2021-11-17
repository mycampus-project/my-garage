import { useState } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import { ArrayOfThings } from '../../tests/testData';
import DeviceListItem from './DeviceListItem';

const DeviceList = () => {
  const [data] = useState([...ArrayOfThings]);

  return (
    <List
      data-testid="userList"
      style={{ width: '100%' }}
      dataSource={data}
      renderItem={(item) => <DeviceListItem item={item} />}
    />
  );
};

export default DeviceList;
