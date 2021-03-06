import { Modal, Form } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import AddDeviceForm from '../Forms/AddDeviceForm';
import UpdateDeviceForm from '../Forms/UpdateDeviceForm';

interface ManageDeviceModalProps {
  isEdit?: boolean;
}

const defaultProps = {
  isEdit: false,
};

const ManageDeviceModal = ({ isEdit }: ManageDeviceModalProps) => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [form] = Form.useForm();

  return (
    <Modal
      title={isEdit ? 'Update Device' : 'A New Device'}
      centered
      visible={modelIsVisible}
      width={500}
      onCancel={() => {
        setModelIsVisible(false);
      }}
      footer={false}
    >
      {isEdit ? <UpdateDeviceForm form={form} /> : <AddDeviceForm form={form} />}
    </Modal>
  );
};

ManageDeviceModal.defaultProps = defaultProps;

export default ManageDeviceModal;
