import { Modal } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import AddTypeForm from '../Forms/AddTypeForm';
import UpdateTypeForm from '../Forms/UpdateTypeForm';

interface ManageTypeModalProps {
  showAdd?: boolean;
}

const defaultProps = {
  showAdd: false,
};

const ManageTypesModal = ({ showAdd }: ManageTypeModalProps) => {
  const { modelIsVisible, setModelIsVisible, selectedType } = useContext(AdminContext);

  return (
    <Modal
      title={showAdd ? 'Add Device' : `Update ${selectedType!.name}`}
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
