import { Modal, Form } from 'antd';
import useThing from 'src/hooks/useThing';
import { useLocalStorage } from '@my-garage/common';
import { useContext, useState } from 'react';
import AddDeviceForm from '../Forms/AddDeviceForm';
import { AdminContext } from '../../../../contexts/AdminContext';
import openNotificationWithIcon from '../../Common/OpenNotificationWithIcon';

const AddDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();
  const [token] = useLocalStorage('auth_token');
  const { onSubmit } = useThing().AddThing(token);
  const [isDisabled] = useState<boolean>(false);

  return (
    <Modal
      title="Add New Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSubmit(values);
          })
          .then(() => {
            setModelIsVisible(false);
          })
          .catch((info) => {
            openNotificationWithIcon('error', 'Something went wrong', info);
          });
      }}
      okButtonProps={{ disabled: isDisabled }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <AddDeviceForm form={form} />
    </Modal>
  );
};

export default AddDeviceModal;
