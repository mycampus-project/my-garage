import { Form, Button, Input, Spin, Select, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useContext, useState } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import useType from 'src/hooks/useType';

const { Option } = Select;

interface SubmitProps {
  name: string;
  bookingTimeDays: number;
}

interface ManageTypeFormProps {
  showAdd?: boolean;
}

const defaultProps = {
  showAdd: false,
};

const ManageTypeForm = ({ showAdd }: ManageTypeFormProps) => {
  const { selectedType } = useContext(AdminContext);
  const { onSubmit, isLoadingAddType } = useType().AddType();
  const { onUpdate, isLoadingupdateType } = useType().UpdateType();
  const [timeInMinutes, setTimeInMinutes] = useState<number>(0);
  const days = [0, 1, 2, 3, 4, 5, 6];

  const handleSubmit = (values: SubmitProps) => {
    const daysInMinutes = values.bookingTimeDays * 1440;
    const totalTime = daysInMinutes + timeInMinutes;
    const momentduration = moment.duration(totalTime, 'minutes');

    let newValues = {
      name: selectedType!.name,
      maxBookingDuration: selectedType!.maxBookingDuration,
    };

    if (values.name.length > 0) {
      newValues = { ...newValues, name: values.name };
    }

    if (values.bookingTimeDays > 0) {
      newValues = { ...newValues, maxBookingDuration: momentduration.asMinutes() };
    }

    if (showAdd) {
      onSubmit(newValues);
    } else if (selectedType) {
      onUpdate({ ...newValues, typeId: selectedType.id });
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

  return (
    <Spin spinning={isLoadingAddType || isLoadingupdateType}>
      <Form
        name={showAdd ? 'Add Type' : 'Update Type'}
        labelCol={{ span: 15 }}
        wrapperCol={{ span: 15 }}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="New Type" name="name" initialValue={showAdd ? '' : selectedType?.name}>
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
            {showAdd ? 'Add' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

ManageTypeForm.defaultProps = defaultProps;

export default ManageTypeForm;
