import { Modal, Spin } from 'antd';
import { useContext } from 'react';
import useThing from 'src/hooks/useThing';
import useUser from 'src/hooks/useUser';
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
  const { modelIsVisible, setModelIsVisible, selectedThing, selectedUser } =
    useContext(AdminContext);

  const { onDelete, isLoadingDeleteThing, deleteThingError } = useThing().DeleteThing();
  const { onDelete: onDeleteUser, isLoadingUser, deleteUserError } = useUser().DeleteUser();

  if (deleteUserError || deleteThingError) {
    return <div>Error</div>;
  }

  if (isLoadingDeleteThing || isLoadingUser) {
    return <Spin />;
  }

  return (
    <Modal
      title="Delete Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        if (isDevice) {
          onDelete(selectedThing.id);
        }
        if (isUser) {
          onDeleteUser(selectedUser.id);
        }
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <Spin spinning={isLoadingDeleteThing}>
        {isDevice && <p>Do you want to delete device {selectedThing.name}?</p>}
        {isBooking && <p>Do you want to delete this booking?</p>}
        {isUser && <p>Do you want to delete user {selectedUser.fullName}?</p>}
      </Spin>
    </Modal>
  );
};

DeleteModal.defaultProps = defaultProps;

export default DeleteModal;
