import { useContext } from 'react';
import { Modal, Form } from 'antd';
import { AdminContext } from 'src/contexts/AdminContext';
import AddDeviceForm from './AddDeviceForm';

const AddDeviceModel = () => {
  const { addDeviceIsVisible, setAddDeviceIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Device"
      centered
      visible={addDeviceIsVisible}
      onOk={() => {
        console.log(form.getFieldsValue());
        form.submit();
        setAddDeviceIsVisible(false);
      }}
      onCancel={() => setAddDeviceIsVisible(false)}
      width={500}
    >
      <AddDeviceForm form={form} />
    </Modal>
  );
};

export default AddDeviceModel;
