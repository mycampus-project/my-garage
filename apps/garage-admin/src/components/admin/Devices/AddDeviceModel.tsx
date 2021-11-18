import { useContext } from 'react';
import { Modal, Form } from 'antd';
import { AdminContext } from 'src/contexts/AdminContext';
import useThing from 'src/hooks/useThing';
import { useLocalStorage } from '@my-garage/common';

import AddDeviceForm from './AddDeviceForm';

const AddDeviceModel = () => {
  const { addDeviceIsVisible, setAddDeviceIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();
  const [token] = useLocalStorage('auth_token');
  const { onSubmit, isLoadingAddThing } = useThing().AddThing(token);

  return (
    <Modal
      title="Add New Device"
      centered
      visible={addDeviceIsVisible}
      onOk={() => {
        const values = form.getFieldsValue();
        onSubmit(values);
        setAddDeviceIsVisible(false);
      }}
      okButtonProps={{ loading: isLoadingAddThing }}
      onCancel={() => setAddDeviceIsVisible(false)}
      width={500}
    >
      <AddDeviceForm form={form} />
    </Modal>
  );
};

export default AddDeviceModel;
