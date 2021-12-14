import { Form, Button, Input, InputNumber, Spin } from 'antd';
import { formatDuration } from 'date-fns';
import { useState } from 'react';
import useType from 'src/hooks/useType';

interface SubmitProps {
  name: string;
  bookingIntervalInHours: number;
}

interface MaxIntervalDate {
  days: number;
  hours: number;
  minutes: number;
}

const AddTypeForm = () => {
  const { onSubmit, isLoadingAddType } = useType().AddType();
  const [maxBookingIntervalDisplay, setMaxBookingIntervalDisplay] =
    useState<MaxIntervalDate | null>(null);

  const handleSubmit = (values: SubmitProps) => {
    onSubmit({ name: values.name, maxBookingDuration: values.bookingIntervalInHours * 60 });
  };

  const handleIntervalChange = (value: number) => {
    const day = Math.floor(value / 24);
    const hour = Math.floor(value % 24);
    const minute = (value * 60) % 60;

    setMaxBookingIntervalDisplay({ days: day, hours: hour, minutes: minute });
  };

  return (
    <Spin spinning={isLoadingAddType}>
      <Form
        name="Add Type"
        labelCol={{ span: 15 }}
        wrapperCol={{ span: 15 }}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
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
        <Form.Item
          label="Type max booking interval in hours"
          name="bookingIntervalInHours"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[0-9]\d*(\.[5])?$/,
              message: 'Max interval has to end in .0 or .5',
            },
          ]}
        >
          <InputNumber
            addonAfter={
              maxBookingIntervalDisplay ? formatDuration(maxBookingIntervalDisplay) : false
            }
            min={0.5}
            max={168}
            onChange={handleIntervalChange}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default AddTypeForm;
