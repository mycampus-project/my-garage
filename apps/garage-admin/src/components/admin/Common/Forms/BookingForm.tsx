import { Form, Input } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import { AddDeviceFormProps } from 'src/types/adminTypes';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const BookingForm = ({ form }: AddDeviceFormProps) => {
  const { selectedThing } = useContext(AdminContext);

  if (selectedThing === null) {
    return openNotificationWithIcon('error', 'SelectedThing Error', 'Selected Device return null');
  }

  return (
    <Form form={form} layout="vertical" name="userForm">
      <Form.Item
        initialValue={selectedThing.name}
        name="name"
        label="Booking Name"
        rules={[
          {
            required: true,
          },
          {
            pattern: /^[A-Za-z0-9._-]/,
            message: 'Name is invalid. Use Alphanumeric values',
          },
          {
            min: 5,
            message: 'Name requires at least 5 characters.',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default BookingForm;
