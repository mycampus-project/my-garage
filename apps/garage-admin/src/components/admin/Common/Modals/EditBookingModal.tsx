import { Modal, Form } from 'antd';
import { useContext, useState } from 'react';
import isValidateAndShowButton from 'src/utilities/ModalFunctions';
import { AdminContext } from '../../../../contexts/AdminContext';
import EditBookingForm from '../Forms/EditBookingForm';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const EditBookingModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const toggleButton = () => {
    setIsDisabled(isValidateAndShowButton(form));
  };

  return (
    <Modal
      title="Edit Booking"
      centered
      visible={modelIsVisible}
      onOk={() => {
        setModelIsVisible(false);
        openNotificationWithIcon('info', 'Testing', 'test');
      }}
      okButtonProps={{ disabled: isDisabled }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <EditBookingForm form={form} showSubmit={toggleButton} />
    </Modal>
  );
};

export default EditBookingModal;
