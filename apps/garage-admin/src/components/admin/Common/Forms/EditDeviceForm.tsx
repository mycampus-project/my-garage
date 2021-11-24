import { Form, Input, Switch, Select, FormInstance } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import UploadAvatar from '../UploadAvatar';

const { Option } = Select;
const { TextArea } = Input;

interface EditDeviceFormProps {
  form: FormInstance;
}

const EditDeviceForm = ({ form }: EditDeviceFormProps) => {
  const { selectedThing } = useContext(AdminContext);

  return (
    <Form data-testid="edit.form" form={form} layout="vertical" name="userForm">
      <Form.Item
        initialValue={selectedThing.name}
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
        initialValue={selectedThing.description}
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
      <Form.Item name="image" label="Upload" valuePropName="fileList">
        <UploadAvatar />
      </Form.Item>
      <Form.Item
        initialValue={selectedThing.type}
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
        <Select style={{ width: 120 }}>
          <Option value="Room">Room</Option>
          <Option value="Printer">Printer</Option>
          <Option value="Peripheral">Peripheral</Option>
        </Select>
      </Form.Item>
      <Form.Item
        data-testid="isAvailable.toggle"
        valuePropName="checked"
        initialValue={selectedThing.isAvailable}
        name="isAvailable"
        label="Available"
        rules={[{ required: true }]}
      >
        <Switch checkedChildren="Yes" unCheckedChildren="No" />
      </Form.Item>
    </Form>
  );
};

export default EditDeviceForm;
