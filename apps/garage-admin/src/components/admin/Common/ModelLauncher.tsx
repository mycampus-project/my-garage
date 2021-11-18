import { useContext } from 'react';
import { AdminContext } from '../../../contexts/AdminContext';
import AddDeviceModal from '../Devices/Modals/AddDeviceModal';
import RestoreDeviceModal from '../Devices/Modals/RestoreDeviceModal';
import EditDeviceModal from '../Devices/Modals/EditDeviceModal';
import DeleteDeviceModal from '../Devices/Modals/DeleteDeviceModal';

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
    default: {
      return <AddDeviceModal />;
    }
  }
};

export default ModelLauncher;
