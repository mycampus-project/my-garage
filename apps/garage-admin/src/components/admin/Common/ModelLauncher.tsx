import { useContext } from 'react';
import { Modal } from 'antd';
import { AdminContext } from '../../../contexts/AdminContext';
import AddDeviceModal from './Modals/AddDeviceModal';
import RestoreDeviceModal from './Modals/RestoreDeviceModal';
import EditDeviceModal from './Modals/EditDeviceModal';
import DeleteDeviceModal from './Modals/DeleteDeviceModal';
import DeleteUserModal from './Modals/DeleteUserModal';
import RestoreUserModal from './Modals/RestoreUserModal';
import ChangeRoleModal from './Modals/ChangeRoleModal';
import DeleteBookingModal from './Modals/DeleteBookingModal';
import EditBookingModal from './Modals/EditBookingModal';
import ManageTypesModal from './Modals/ManageTypesModal';

const ModelLauncher = () => {
  const { modelType } = useContext(AdminContext);

  switch (modelType) {
    case 'add-device': {
      return <AddDeviceModal />;
    }
    case 'edit-device': {
      return <EditDeviceModal />;
    }
    case 'restore-device': {
      return <RestoreDeviceModal />;
    }
    case 'delete-device': {
      return <DeleteDeviceModal />;
    }
    case 'restore-user': {
      return <RestoreUserModal />;
    }
    case 'delete-user': {
      return <DeleteUserModal />;
    }
    case 'change-role': {
      return <ChangeRoleModal />;
    }
    case 'delete-booking': {
      return <DeleteBookingModal />;
    }
    case 'edit-booking': {
      return <EditBookingModal />;
    }
    case 'manage-type': {
      return <ManageTypesModal />;
    }
    default: {
      return <Modal />;
    }
  }
};

export default ModelLauncher;
