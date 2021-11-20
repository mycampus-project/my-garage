import { Thing } from '@my-garage/common';
import { PageHeader } from 'antd';

interface Props {
  thing: Thing;
  onBackClick: () => void;
}

const DeviceBooking = ({ thing, onBackClick }: Props) => (
  <PageHeader title={thing.name} ghost onBack={onBackClick} />
);

export default DeviceBooking;
