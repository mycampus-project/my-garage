import { Modal, Form } from 'antd';
import useThing from 'src/hooks/useThing';
import { useLocalStorage } from '@my-garage/common';
import { useContext } from 'react';
import AddDeviceForm from '../Forms/AddDeviceForm';
import { AdminContext } from '../../../../contexts/AdminContext';

const AddDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();
  const [token] = useLocalStorage('auth_token');
  const { onSubmit, isLoadingAddThing } = useThing().AddThing(token);

  return (
    <Modal
      title="Add New Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        const values = form.getFieldsValue();
        onSubmit(values);
        setModelIsVisible(false);
      }}
      okButtonProps={{ loading: isLoadingAddThing }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <AddDeviceForm form={form} />
    </Modal>
  );
};

export default AddDeviceModal;
