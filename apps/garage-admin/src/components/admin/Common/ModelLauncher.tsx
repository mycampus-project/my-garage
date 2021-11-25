import { useContext } from 'react';
import { Modal } from 'antd';
import { AdminContext } from '../../../contexts/AdminContext';
import ChangeRoleModal from './Modals/ChangeRoleModal';
import ManageTypesModal from './Modals/ManageTypesModal';
import ManageDeviceModal from './Modals/ManageDeviceModal';
import DeleteModal from './Modals/DeleteModal';
import ManageBookingModal from './Modals/ManageBookingModal';
import RestoreModal from './Modals/RestoreModal';

const ModelLauncher = () => {
  const { modelType } = useContext(AdminContext);

  switch (modelType) {
    case 'add-device': {
      return <ManageDeviceModal />;
    }
    case 'edit-device': {
      return <ManageDeviceModal isEdit />;
    }
    case 'restore-device': {
      return <RestoreModal isDevice />;
    }
    case 'delete-device': {
      return <DeleteModal isDevice />;
    }
    case 'restore-user': {
      return <RestoreModal isUser />;
    }
    case 'delete-user': {
      return <DeleteModal isUser />;
    }
    case 'change-role': {
      return <ChangeRoleModal />;
    }
    case 'delete-booking': {
      return <DeleteModal isBooking />;
    }
    case 'edit-booking': {
      return <ManageBookingModal />;
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
