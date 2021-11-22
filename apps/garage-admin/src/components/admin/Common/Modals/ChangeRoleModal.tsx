import { Modal } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const DeleteDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);

  return (
    <Modal
      title="Change User Role"
      centered
      visible={modelIsVisible}
      onOk={() => {
        setModelIsVisible(false);
        openNotificationWithIcon('info', 'Testing', 'test');
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <p>Do you want to change this users role?</p>
    </Modal>
  );
};

export default DeleteDeviceModal;
