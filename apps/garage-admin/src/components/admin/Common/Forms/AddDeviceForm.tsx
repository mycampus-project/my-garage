import { Form, Input, Switch, Select } from 'antd';
import { AddDeviceFormProps } from 'src/types/adminTypes';

const { Option } = Select;
const { TextArea } = Input;

const AddDeviceForm = ({ form, showSubmit }: AddDeviceFormProps) => (
  <Form form={form} layout="vertical" name="userForm" onFieldsChange={showSubmit}>
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
      rules={[
        {
          required: true,
        },
        {
          pattern: /^[A-Za-z0-9._-]/,
          message: 'Character is invalid. Use Alphanumeric values',
        },
        {
          min: 10,
          message: 'Description requires at least 10 characters.',
        },
      ]}
    >
      <TextArea rows={4} />
    </Form.Item>
    {/* <Form.Item
      name="upload"
      label="Upload"
      valuePropName="fileList"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <UploadAvatar />
    </Form.Item> */}
    <Form.Item
      name="type"
      label="Type"
      rules={[
        {
          required: true,
        },
        {
          pattern: /^[A-Za-z0-9._-]/,
          message: 'Name is invalid. Use Alphanumeric values',
        },
        {
          min: 4,
          message: 'Type requires at least 5 characters.',
        },
      ]}
    >
      <Select value="" style={{ width: 120 }}>
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
      <Switch checkedChildren="Yes" unCheckedChildren="No" checked />
    </Form.Item>
  </Form>
);

export default AddDeviceForm;
