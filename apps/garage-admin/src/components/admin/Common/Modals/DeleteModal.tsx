import { Modal, Spin } from 'antd';
import { useContext } from 'react';
import useThing from 'src/hooks/useThing';
import { AdminContext } from '../../../../contexts/AdminContext';

interface DeleteModalProps {
  isDevice?: boolean;
  isBooking?: boolean;
  isUser?: boolean;
}

const defaultProps = {
  isDevice: false,
  isBooking: false,
  isUser: false,
};

const DeleteModal = ({ isDevice, isBooking, isUser }: DeleteModalProps) => {
  const { modelIsVisible, setModelIsVisible, selectedThing } = useContext(AdminContext);

  const { onDelete, isLoadingDeleteThing } = useThing().DeleteThing();

  return (
    <Modal
      title="Delete Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        if (isDevice) {
          onDelete(selectedThing.id);
        }
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <Spin spinning={isLoadingDeleteThing}>
        {isDevice && <p>Do you want to delete this device?</p>}
        {isBooking && <p>Do you want to delete this booking?</p>}
        {isUser && <p>Do you want to delete this user?</p>}
      </Spin>
    </Modal>
  );
};

DeleteModal.defaultProps = defaultProps;

export default DeleteModal;
