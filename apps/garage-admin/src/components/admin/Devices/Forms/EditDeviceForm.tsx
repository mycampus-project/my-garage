import { Form, Input, Switch, Select, FormInstance } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';

const { Option } = Select;
const { TextArea } = Input;

interface AddDeviceFormProps {
  form: FormInstance;
}

const EditDeviceForm = ({ form }: AddDeviceFormProps) => {
  const { selectedThing } = useContext(AdminContext);

  return (
    <Form form={form} layout="vertical" name="userForm">
      <Form.Item
        initialValue={selectedThing.name}
        name="name"
        label="Device Name"
        rules={[
          {
            required: true,
            pattern: /^[A-Za-z0-9._-]/,
            message: 'Name is invalid. Use Alphanumeric values',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={selectedThing.description}
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input a description!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        initialValue={selectedThing.type}
        name="type"
        label="Type"
        rules={[{ required: true, message: 'Please select a type!' }]}
      >
        <Select style={{ width: 120 }}>
          <Option value="Default">-</Option>
          <Option value="Room">Room</Option>
          <Option value="Printer">Printer</Option>
          <Option value="Peripheral">Peripheral</Option>
        </Select>
      </Form.Item>
      <Form.Item
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
