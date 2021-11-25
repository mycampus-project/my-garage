import { Modal, Form } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import DeviceForm from '../Forms/DeviceForm';

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
      footer={[]}
    >
      {isEdit ? <DeviceForm form={form} showEdit /> : <DeviceForm form={form} />}
    </Modal>
  );
};

ManageDeviceModal.defaultProps = defaultProps;

export default ManageDeviceModal;
