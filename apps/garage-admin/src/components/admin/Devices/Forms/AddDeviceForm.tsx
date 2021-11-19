import { Form, Input, Switch, Select, FormInstance } from 'antd';
import UploadAvatar from '../../Common/UploadAvatar';

const { Option } = Select;
const { TextArea } = Input;

interface AddDeviceFormProps {
  form: FormInstance;
}

const AddDeviceForm = ({ form }: AddDeviceFormProps) => {
  const onChange = () => {};

  const handleChange = () => {};

  return (
    <Form form={form} layout="vertical" name="userForm">
      <Form.Item
        name="name"
        label="Device Name"
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
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input a description!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="upload" label="Upload" valuePropName="fileList">
        <UploadAvatar />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: 'Please select a type!' }]}
      >
        <Select value="Default" style={{ width: 120 }} onChange={handleChange}>
          <Option value="Default">-</Option>
          <Option value="Room">Room</Option>
          <Option value="Printer">Printer</Option>
          <Option value="Peripheral">Peripheral</Option>
        </Select>
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        name="isAvailable"
        label="Available"
        rules={[{ required: true }]}
      >
        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={onChange} />
      </Form.Item>
    </Form>
  );
};

export default AddDeviceForm;
