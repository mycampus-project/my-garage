import { Form, Button, Input, Spin, Select, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import useType from 'src/hooks/useType';

const { Option } = Select;

interface SubmitProps {
  name: string;
  bookingTimeDays: number;
}

const AddTypeForm = () => {
  const { onSubmit, isLoadingAddType } = useType().AddType();
  const [timeInMinutes, setTimeInMinutes] = useState<number>(0);
  const days = [0, 1, 2, 3, 4, 5, 6];

  const handleSubmit = (values: SubmitProps) => {
    const daysInMinutes = values.bookingTimeDays * 1440;
    const totalTime = daysInMinutes + timeInMinutes;
    const momentduration = moment.duration(totalTime, 'minutes');

    onSubmit({ name: values.name, maxBookingDuration: momentduration.asMinutes() });
  };

  const handleTimeChange = (value: Moment | null, dateString: string) => {
    if (value) {
      const hours = dateString.slice(0, 2).toString();
      const mins = dateString.slice(3, 5).toString();
      const total = parseInt(hours, 10) * 60 + parseInt(mins, 10);
      setTimeInMinutes(total);
    }
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
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Select Booking Interval Days" name="bookingTimeDays">
          <Select value="" style={{ width: 120 }}>
            {days.map((item: number) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Select Booking Interval Hours:Minutes">
          <TimePicker format="HH:mm" minuteStep={30} onChange={handleTimeChange} />
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
