import { Modal } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const DeleteDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);

  return (
    <Modal
      title="Delete User"
      centered
      visible={modelIsVisible}
      onOk={() => {
        setModelIsVisible(false);
        openNotificationWithIcon('info', 'Testing', 'test');
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <p>Do you want to delete this user?</p>
    </Modal>
  );
};

export default DeleteDeviceModal;
