import { Modal } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import AddTypeForm from '../Forms/AddTypeForm';
import UpdateTypeForm from '../Forms/UpdateTypeForm';
import openNotificationWithIcon from '../OpenNotificationWithIcon';

interface ManageTypeModalProps {
  showAdd?: boolean;
}

const defaultProps = {
  showAdd: false,
};

const ManageTypesModal = ({ showAdd }: ManageTypeModalProps) => {
  const { modelIsVisible, setModelIsVisible, selectedType } = useContext(AdminContext);

  if (selectedType === null) {
    openNotificationWithIcon('error', 'SelectedType Error', 'Selected Type return null');
    return <div>Error</div>;
  }

  return (
    <Modal
      title={showAdd ? 'Add Type' : `Update ${selectedType.name}`}
      centered
      visible={modelIsVisible}
      onCancel={() => setModelIsVisible(false)}
      footer={false}
    >
      {showAdd ? <AddTypeForm /> : <UpdateTypeForm />}
    </Modal>
  );
};

ManageTypesModal.defaultProps = defaultProps;

export default ManageTypesModal;
