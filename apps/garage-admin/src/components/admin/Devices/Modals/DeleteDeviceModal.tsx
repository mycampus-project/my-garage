import { Modal } from 'antd';
import { useLocalStorage } from '@my-garage/common';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';

const DeleteDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [token] = useLocalStorage('auth_token');
  console.log(token);

  return (
    <Modal
      title="Delete Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        setModelIsVisible(false);
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <p>Do you want to delete this device?</p>
    </Modal>
  );
};

export default DeleteDeviceModal;
