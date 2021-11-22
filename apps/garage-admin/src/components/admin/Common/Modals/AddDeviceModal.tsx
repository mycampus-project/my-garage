import { Modal, Form } from 'antd';
import useThing from 'src/hooks/useThing';
import { useLocalStorage } from '@my-garage/common';
import { useContext, useState } from 'react';
import isValidateAndShowButton from 'src/utilities/ModalFunctions';
import AddDeviceForm from '../Forms/AddDeviceForm';
import { AdminContext } from '../../../../contexts/AdminContext';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const AddDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible, image } = useContext(AdminContext);
  const [form] = Form.useForm();
  const [token] = useLocalStorage('auth_token');
  const { onSubmit } = useThing().AddThing(token);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const toggleButton = () => {
    setIsDisabled(isValidateAndShowButton(form));
  };

  const newThing = (values: any) => {
    const newObject = {
      ...values,
      image: image as File,
    };
    return newObject;
  };

  return (
    <Modal
      title="Add New Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSubmit(newThing(values));
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
      <AddDeviceForm form={form} showSubmit={toggleButton} />
    </Modal>
  );
};

export default AddDeviceModal;
