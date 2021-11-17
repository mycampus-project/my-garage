import { useContext } from 'react';
import { Modal } from 'antd';
import { AdminContext } from 'src/contexts/AdminContext';

const AddDeviceModel = () => {
  const { addDeviceIsVisible, setAddDeviceIsVisible } = useContext(AdminContext);
  return (
    <Modal
      title="Model for adding new Devices"
      centered
      visible={addDeviceIsVisible}
      onOk={() => setAddDeviceIsVisible(false)}
      onCancel={() => setAddDeviceIsVisible(false)}
      width={1000}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
};

export default AddDeviceModel;
