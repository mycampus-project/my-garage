import { List } from 'antd';
import { BookingData } from '../../../types/adminTypes';
import DeviceBookingItem from './DeviceBookingItem';

interface DataProps {
  data: BookingData[];
}

const DeviceBookingsList = ({ data }: DataProps) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => <DeviceBookingItem item={item} />}
  />
);

export default DeviceBookingsList;
