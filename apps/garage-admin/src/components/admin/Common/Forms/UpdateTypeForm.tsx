import { Form, Button, Input, Spin, Select, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useContext, useState } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import useType from 'src/hooks/useType';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const { Option } = Select;

interface SubmitProps {
  name: string;
  bookingTimeDays: number;
}

const UpdateTypeForm = () => {
  const { selectedType } = useContext(AdminContext);
  const { onUpdate, isLoadingupdateType } = useType().UpdateType();
  const [timeInMinutes, setTimeInMinutes] = useState<number>(0);
  const days = [0, 1, 2, 3, 4, 5, 6];

  const handleSubmit = (values: SubmitProps) => {
    const daysInMinutes = values.bookingTimeDays
      ? values.bookingTimeDays * 1440
      : Math.floor(selectedType!.maxBookingDuration / 1440) * 1440;
    const totalTime = daysInMinutes + timeInMinutes;
    const momentduration = moment.duration(totalTime, 'minutes');

    const newValue = {
      typeId: selectedType!.id,
      name: values.name,
      maxBookingDuration: momentduration.asMinutes(),
    };

    if (newValue.maxBookingDuration === 0) {
      openNotificationWithIcon('error', 'Error max booking duration', 'Max booking must not be 0');
    } else {
      onUpdate(newValue);
    }
  };

  const handleTimeChange = (value: Moment | null, dateString: string) => {
    if (value) {
      const hours = dateString.slice(0, 2).toString();
      const mins = dateString.slice(3, 5).toString();
      const total = parseInt(hours, 10) * 60 + parseInt(mins, 10);
      setTimeInMinutes(total);
    }
  };

  const getDays = (value: number) => Math.floor(value / 1440).toString();

  return (
    <Spin spinning={isLoadingupdateType}>
      <Form
        name="Update Type"
        labelCol={{ span: 15 }}
        wrapperCol={{ span: 15 }}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Select Booking Interval Days" name="bookingTimeDays">
          <Select
            value=""
            style={{ width: 120 }}
            defaultValue={getDays(selectedType!.maxBookingDuration)}
          >
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateTypeForm;
