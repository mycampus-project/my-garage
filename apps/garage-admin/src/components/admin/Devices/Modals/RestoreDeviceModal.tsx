import { Modal } from 'antd';
import { useLocalStorage } from '@my-garage/common';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import RestoreDeviceList from '../RestoreDeviceList';

const RestoreDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [token] = useLocalStorage('auth_token');
  console.log(token);

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
