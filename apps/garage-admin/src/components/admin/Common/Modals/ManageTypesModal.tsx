import { Type } from '@my-garage/common';
import { Button, Modal, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import useType from 'src/hooks/useType';
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

  const { data, error, isLoading } = useType().GetListOfTypes();
  const [filteredData, setFilteredData] = useState<Type[]>([]);

  const sortedArray = (dataArray: Type[]) => {
    function compareByName(a: Type, b: Type) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    return dataArray.sort(compareByName);
  };

  useEffect(() => {
    const sortedData = data ? sortedArray(data.data) : new Array<Type>();
    const filteredArray = toggleRestoreTypes
      ? sortedData.filter((item: Type) => item.removedBy !== undefined)
      : sortedData.filter((item: Type) => item.removedBy === undefined);
    setFilteredData(filteredArray);
  }, [data, toggleRestoreTypes]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Modal
      title={toggleRestoreTypes ? 'Deleted Types' : 'Current Types'}
      centered
      visible={modelIsVisible}
      onCancel={() => setModelIsVisible(false)}
      footer={[
        <StyledButton
          key={1}
          type="primary"
          onClick={() => {
            setToggleRestoreTypes(!toggleRestoreTypes);
          }}
        >
          {toggleRestoreTypes ? 'Current Types' : 'Deleted Types'}
        </StyledButton>,
      ]}
    >
      <Spin spinning={isLoading}>
        <TypeList data={filteredData} showRestore={toggleRestoreTypes} />
        {!toggleRestoreTypes && <AddTypeForm />}
      </Spin>
    </Modal>
  );
};

export default ManageTypesModal;
