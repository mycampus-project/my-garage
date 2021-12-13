import { Modal, Spin } from 'antd';
import { useContext } from 'react';
import useBooking from 'src/hooks/useBooking';
import useThing from 'src/hooks/useThing';
import useType from 'src/hooks/useType';
import useUser from 'src/hooks/useUser';
import { AdminContext } from '../../../../contexts/AdminContext';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

interface DeleteModalProps {
  isDevice?: boolean;
  isBooking?: boolean;
  isUser?: boolean;
  isType?: boolean;
}

const defaultProps = {
  isDevice: false,
  isBooking: false,
  isUser: false,
  isType: false,
};

const DeleteModal = ({ isDevice, isBooking, isUser, isType }: DeleteModalProps) => {
  const {
    modelIsVisible,
    setModelIsVisible,
    selectedThing,
    selectedUser,
    selectedBookingId,
    selectedType,
  } = useContext(AdminContext);

  const { onDelete, isLoadingDeleteThing, deleteThingError } = useThing().DeleteThing();
  const { onDelete: onDeleteUser, isLoadingUser, deleteUserError } = useUser().DeleteUser();
  const {
    onDelete: onDeleteBooking,
    isLoadingDeleteBooking,
    deleteBookingError,
  } = useBooking().DeleteBooking();
  const { onDelete: onDeleteType, isLoadingDeleteType, deleteTypeError } = useType().DeleteType();

  if (deleteUserError || deleteThingError || deleteBookingError || deleteTypeError) {
    return <div>Error</div>;
  }

  return (
    <Modal
      title="Delete Device"
      centered
      visible={modelIsVisible}
      onOk={() => {
        if (isDevice && selectedThing) {
          onDelete(selectedThing.id);
        }
        if (isUser && selectedUser) {
          onDeleteUser(selectedUser.id);
        }
        if (isType && selectedType) {
          onDeleteType(selectedType.id);
        }
        if (isBooking) {
          if (selectedBookingId !== '') {
            onDeleteBooking(selectedBookingId);
          } else {
            openNotificationWithIcon(
              'error',
              'Booking Id Error',
              `${selectedBookingId} was not correct.`,
            );
          }
        }
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <Spin
        spinning={
          isLoadingDeleteThing || isLoadingUser || isLoadingDeleteBooking || isLoadingDeleteType
        }
      >
        {isDevice && <p>Do you want to delete device {selectedThing ? selectedThing.name : ''}?</p>}
        {isBooking && <p>Do you want to delete this booking?</p>}
        {isUser && <p>Do you want to delete user {selectedUser ? selectedUser.fullName : ''}?</p>}
        {isType && <p>Do you want to delete type {selectedType ? selectedType.name : ''}?</p>}
      </Spin>
    </Modal>
  );
};

DeleteModal.defaultProps = defaultProps;

export default DeleteModal;
