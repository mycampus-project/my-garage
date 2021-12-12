import { Modal, Spin } from 'antd';
import { useContext } from 'react';
import useUser from 'src/hooks/useUser';
import { AdminContext } from '../../../../contexts/AdminContext';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

const DeleteDeviceModal = () => {
  const { modelIsVisible, setModelIsVisible, selectedUser } = useContext(AdminContext);
  const { onUpdateRole, updateUserRoleError, isLoadingUpdateUserRole } = useUser().ChangeUserRole();

  if (updateUserRoleError) {
    return <div>Error</div>;
  }

  if (isLoadingUpdateUserRole) {
    return <Spin />;
  }

  if (selectedUser === null) {
    openNotificationWithIcon('error', 'SelectedUser Error', 'Selected User return null');
    return <div>Error</div>;
  }

  return (
    <Modal
      title="Change User Role"
      centered
      visible={modelIsVisible}
      onOk={() => {
        if (selectedUser.role === 'user') {
          onUpdateRole({ role: 'admin', userId: selectedUser.id });
        }
        if (selectedUser.role === 'admin') {
          onUpdateRole({ role: 'user', userId: selectedUser.id });
        }
      }}
      onCancel={() => setModelIsVisible(false)}
      width={500}
    >
      <p>Do you want to change this users role?</p>
    </Modal>
  );
};

export default DeleteDeviceModal;
