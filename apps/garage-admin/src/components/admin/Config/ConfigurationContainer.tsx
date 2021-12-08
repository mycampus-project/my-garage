import { Type } from '@my-garage/common';
import { Button, Card, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import useType from 'src/hooks/useType';
import styled from 'styled-components';
import TypeList from '../Dashboards/TypeList';

const CenteredContainer = styled(Card)`
  width: 50%;
  margin-bottom: 32px;
`;

const ConfigurationContainer = () => {
  const { setModelIsVisible, setModelType } = useContext(AdminContext);
  const [toggleRestoreTypes] = useState<boolean>(false);

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
    <CenteredContainer
      title="Manage Types"
      extra={
        <Button
          type="primary"
          onClick={() => {
            setModelType('manage-type');
            setModelIsVisible(true);
          }}
        >
          Add Type
        </Button>
      }
    >
      <Spin spinning={isLoading}>
        <TypeList data={filteredData} showRestore={false} />
      </Spin>
    </CenteredContainer>
  );
};

export default ConfigurationContainer;
