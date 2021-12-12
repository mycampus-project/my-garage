import { Form, Button, Input, Spin, InputNumber } from 'antd';
import { formatDuration } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
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

const UpdateTypeForm = () => {
  const { selectedType } = useContext(AdminContext);
  const { onUpdate, isLoadingupdateType } = useType().UpdateType();
  const [maxBookingIntervalDisplay, setMaxBookingIntervalDisplay] =
    useState<MaxIntervalDate | null>(null);

  const handleSubmit = (values: SubmitProps) => {
    if (selectedType) {
      onUpdate({
        name: values.name,
        maxBookingDuration: values.bookingIntervalInHours * 60,
        typeId: selectedType.id,
      });
    }
  };

  const handleIntervalChange = (value: number) => {
    const day = Math.floor(value / 24);
    const hour = Math.floor(value % 24);
    const minute = (value * 60) % 60;

    setMaxBookingIntervalDisplay({ days: day, hours: hour, minutes: minute });
  };

  useEffect(() => {
    if (selectedType) {
      const timeInHours = selectedType.maxBookingDuration / 60;
      handleIntervalChange(timeInHours);
    }
  }, [selectedType]);

  return (
    <Spin spinning={isLoadingupdateType}>
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
          initialValue={selectedType ? selectedType.name : false}
          rules={[
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
          label="Select Booking Interval In Hours"
          name="bookingIntervalInHours"
          initialValue={selectedType ? selectedType.maxBookingDuration / 60 : 0.5}
          rules={[
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateTypeForm;
