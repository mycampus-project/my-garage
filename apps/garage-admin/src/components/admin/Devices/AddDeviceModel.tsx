import { useContext } from 'react';
import { Modal, Form, Input, Switch, Select } from 'antd';
import { AdminContext } from 'src/contexts/AdminContext';

const { Option } = Select;
const { TextArea } = Input;

const AddDeviceModel = () => {
  const { addDeviceIsVisible, setAddDeviceIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();

  const onChange = () => {};

  const handleChange = () => {};

  return (
    <Modal
      title="Add New Device"
      centered
      visible={addDeviceIsVisible}
      onOk={() => {
        form.submit();
        setAddDeviceIsVisible(false);
      }}
      onCancel={() => setAddDeviceIsVisible(false)}
      width={500}
    >
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item name="name" label="Device Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select defaultValue="-" style={{ width: 120 }} onChange={handleChange}>
            <Option value="Room">Room</Option>
            <Option value="Printer">Printer</Option>
            <Option value="Peripheral">Peripheral</Option>
          </Select>
        </Form.Item>
        <Form.Item name="isAvailable" label="Availability" rules={[{ required: true }]}>
          <Switch
            checkedChildren="Available"
            unCheckedChildren="Unavailable"
            defaultChecked
            onChange={onChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDeviceModel;
