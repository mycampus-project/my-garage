import { Modal, Form } from 'antd';
import { useLocalStorage } from '@my-garage/common';
import { useContext, useState } from 'react';
import isValidateAndShowButton from 'src/utilities/ModalFunctions';
import useThing from 'src/hooks/useThing';
import EditDeviceForm from '../Forms/EditDeviceForm';
import { AdminContext } from '../../../../contexts/AdminContext';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const EditDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible, selectedThing } = useContext(AdminContext);
  const [form] = Form.useForm();
  const [token] = useLocalStorage('auth_token');
  const { onUpdate } = useThing().UpdateThing(token);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const toggleButton = () => {
    setIsDisabled(isValidateAndShowButton(form));
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
            const device = {
              thingId: selectedThing.id,
              ...values,
            };

            onUpdate(device);
          })
          .then(() => {
            setModelIsVisible(false);
          })
          .catch(() => {
            openNotificationWithIcon('error', 'Something went wrong', 'oops validation failed');
          });
      }}
      okButtonProps={{ disabled: isDisabled }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <EditDeviceForm form={form} showSubmit={toggleButton} />
    </Modal>
  );
};

export default EditDeviceModal;
