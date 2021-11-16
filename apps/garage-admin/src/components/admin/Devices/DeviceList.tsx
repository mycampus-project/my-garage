import { useState } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import { Thing } from '@my-garage/common';
import DeviceListItem from './DeviceListItem';

const arrayOfThings: Thing[] = [
  {
    name: 'Media Office',
    description: 'Video editing software and computer area.',
    type: 'Room',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: true,
  },
  {
    name: '3D Printer 1',
    description: 'Large 3D printer',
    type: 'Printer',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: false,
  },
  {
    name: 'Occulus Rift Headset',
    description: 'Augmented reality headset and controllers',
    type: 'AR',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: true,
  },
  {
    name: 'Meeting Space',
    description: '10 seating office meeting room. With whiteboards and TV screen.',
    type: 'Room',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: true,
  },
  {
    name: '3D Printer 2',
    description: 'Medium 3D printer',
    type: 'Printer',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: true,
  },
  {
    name: '3D Printer 3',
    description: 'Small 3D printer',
    type: 'Printer',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: true,
  },
  {
    name: 'Raspberry Pi 1',
    description: 'Model 4 micro computer',
    type: 'Computer',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: false,
  },
  {
    name: 'Raspberry Pi 2',
    description: 'Model 4 micro computer',
    type: 'Computer',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: true,
  },
  {
    name: 'Raspberry Pi 3',
    description: 'Model 4 micro computer',
    type: 'Computer',
    createdAt: new Date(),
    createdBy: 'Mike',
    isAvailable: true,
  },
];

const DeviceList = () => {
  const [data] = useState([...arrayOfThings]);

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
