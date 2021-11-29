import { Modal } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import RestoreDeviceList from '../../Devices/RestoreDeviceList';
import RestoreUserList from '../../Devices/RestoreUserList';

interface RestoreModalProps {
  isDevice?: boolean;
  isBooking?: boolean;
  isUser?: boolean;
}

const defaultProps = {
  isDevice: false,
  isBooking: false,
  isUser: false,
};

const RestoreModal = ({ isDevice, isUser, isBooking }: RestoreModalProps) => {
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
      {isDevice && <RestoreDeviceList />}
      {isUser && <RestoreUserList />}
      {isBooking && <RestoreDeviceList />}
    </Modal>
  );
};

RestoreModal.defaultProps = defaultProps;

export default RestoreModal;
