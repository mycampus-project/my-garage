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
        <Input defaultValue={selectedThing.name} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input a description!' }]}
      >
        <TextArea defaultValue={selectedThing.description} rows={4} />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: 'Please select a type!' }]}
      >
        <Select defaultValue={selectedThing.type} style={{ width: 120 }}>
          <Option value="Default">-</Option>
          <Option value="Room">Room</Option>
          <Option value="Printer">Printer</Option>
          <Option value="Peripheral">Peripheral</Option>
        </Select>
      </Form.Item>
      <Form.Item name="isAvailable" label="Available" rules={[{ required: true }]}>
        <Switch
          defaultChecked={selectedThing.isAvailable}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </Form.Item>
    </Form>
  );
};

export default EditDeviceForm;
