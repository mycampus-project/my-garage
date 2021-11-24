import { Button, Modal, Space } from 'antd';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { AdminContext } from '../../../../contexts/AdminContext';
import TypeList from '../../Devices/TypeList';
import AddTypeForm from '../Forms/AddTypeForm';

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const ManageTypesModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);
  const [toggleRestoreTypes, setToggleRestoreTypes] = useState<boolean>(false);

  return (
    <Modal
      title="Manage Types"
      centered
      visible={modelIsVisible}
      onCancel={() => setModelIsVisible(false)}
      footer={[
        <StyledButton
          type="primary"
          onClick={() => {
            setToggleRestoreTypes(!toggleRestoreTypes);
          }}
        >
          {toggleRestoreTypes ? 'Current Types' : 'Restore Types'}
        </StyledButton>,
      ]}
    >
      {toggleRestoreTypes ? (
        <TypeList showRestoreData />
      ) : (
        <Space direction="vertical" size={56} style={{ width: '100%' }}>
          <TypeList />
          <AddTypeForm />
        </Space>
      )}
    </Modal>
  );
};

export default ManageTypesModal;
