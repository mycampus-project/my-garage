import { Modal } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import RestoreDeviceList from '../../Devices/RestoreDeviceList';

const RestoreUserModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);

  return (
    <Modal
      title="Restore Users"
      centered
      visible={modelIsVisible}
      onCancel={() => setModelIsVisible(false)}
      width={500}
      footer={[]}
    >
      <RestoreDeviceList />
    </Modal>
  );
};

export default RestoreUserModal;
