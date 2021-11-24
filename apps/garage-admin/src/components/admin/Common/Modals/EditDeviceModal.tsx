import { Modal, Form } from 'antd';
import { useLocalStorage } from '@my-garage/common';
import { useContext } from 'react';
import useThing from 'src/hooks/useThing';
import EditDeviceForm from '../Forms/EditDeviceForm';
import { AdminContext } from '../../../../contexts/AdminContext';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const EditDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible, image, selectedThing } = useContext(AdminContext);
  const [form] = Form.useForm();
  const [token] = useLocalStorage('auth_token');
  const { onUpdate } = useThing().UpdateThing(token);

  const newThing = (values: any) => {
    const newObject = {
      ...values,
      image: image as File,
      thingId: selectedThing.id,
    };
    return newObject;
  };

  return (
    <Modal
      data-testid="edit.device.modal"
      title="Edit Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onUpdate(newThing(values));
          })
          .then(() => {
            setModelIsVisible(false);
          })
          .catch(() => {
            openNotificationWithIcon('error', 'Something went wrong', 'oops validation failed');
          });
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <EditDeviceForm form={form} />
    </Modal>
  );
};

export default EditDeviceModal;
