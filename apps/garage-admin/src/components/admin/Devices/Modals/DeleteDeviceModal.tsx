import { Modal } from 'antd';
import { useLocalStorage } from '@my-garage/common';
import { useContext } from 'react';
import useThing from 'src/hooks/useThing';
import { AdminContext } from '../../../../contexts/AdminContext';

const DeleteDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible, selectedThing } = useContext(AdminContext);
  const [token] = useLocalStorage('auth_token');
  const { onDelete } = useThing().DeleteThing(token);

  return (
    <Modal
      title="Delete Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        onDelete(selectedThing.id);
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <p>Do you want to delete this device?</p>
    </Modal>
  );
};

export default DeleteDeviceModal;
