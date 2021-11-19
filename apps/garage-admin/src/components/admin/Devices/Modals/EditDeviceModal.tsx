import { Modal, Form } from 'antd';
import { useLocalStorage } from '@my-garage/common';
import { useContext } from 'react';
import useThing from 'src/hooks/useThing';
import EditDeviceForm from '../Forms/EditDeviceForm';
import { AdminContext } from '../../../../contexts/AdminContext';

const EditDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible, selectedThing } = useContext(AdminContext);
  const [form] = Form.useForm();
  const [token] = useLocalStorage('auth_token');
  const { onUpdate } = useThing().UpdateThing(token);

  return (
    <Modal
      title="Edit Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        const device = {
          thingId: selectedThing.id,
          ...form.getFieldsValue(),
        };
        onUpdate(device);
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
