import { Modal } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import RestoreDeviceList from '../../Devices/RestoreDeviceList';

const RestoreDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);

  return (
    <Modal
      title="Restore Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        setModelIsVisible(false);
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
      footer={[]}
    >
      <RestoreDeviceList />
    </Modal>
  );
};

export default RestoreDeviceModal;
