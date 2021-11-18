import { Modal, Form } from 'antd';
import { useLocalStorage } from '@my-garage/common';
import { useContext } from 'react';
import EditDeviceForm from '../Forms/EditDeviceForm';
import { AdminContext } from '../../../../contexts/AdminContext';

const EditDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();
  const [token] = useLocalStorage('auth_token');
  console.log(token);

  return (
    <Modal
      title="Edit Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        setModelIsVisible(false);
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <EditDeviceForm form={form} />
    </Modal>
  );
};

export default EditDeviceModal;
