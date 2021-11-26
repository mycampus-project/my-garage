import { Modal, Form } from 'antd';
import { useContext, useState } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import EditBookingForm from '../Forms/BookingForm';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const ManageBookingModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();

  const [isDisabled] = useState<boolean>(true);

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
      <EditBookingForm form={form} />
    </Modal>
  );
};

export default ManageBookingModal;
