import { Modal } from 'antd';
import { useContext } from 'react';
import { AdminContext } from '../../../../contexts/AdminContext';
import ManageTypeForm from '../Forms/ManageTypeForm';

interface ManageTypeModalProps {
  showAdd?: boolean;
}

const defaultProps = {
  showAdd: false,
};

const ManageTypesModal = ({ showAdd }: ManageTypeModalProps) => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);

  return (
    <Modal
      title={showAdd ? 'Add Device' : 'Update Device'}
      centered
      visible={modelIsVisible}
      onCancel={() => setModelIsVisible(false)}
    >
      {showAdd ? <ManageTypeForm showAdd /> : <ManageTypeForm />}
    </Modal>
  );
};

ManageTypesModal.defaultProps = defaultProps;

export default ManageTypesModal;
