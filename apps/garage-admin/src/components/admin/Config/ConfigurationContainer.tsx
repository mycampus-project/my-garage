import { Type } from '@my-garage/common';
import { Button, Card, Space, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import useType from 'src/hooks/useType';
import styled from 'styled-components';
import TypeList from '../Dashboards/TypeList';

const CenteredContainer = styled(Card)`
  min-width: 600px;
  width: 50%;
  height: 80%;
  overflow: auto;
  justify-self: center;
  align-self: center;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px var(--ant-primary-2);
  }
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
      title={<h1>Manage Types</h1>}
      extra={
        <Space direction="horizontal" size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModelType('add-type');
              setModelIsVisible(true);
            }}
          >
            Add Type
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setModelType('restore-type');
              setModelIsVisible(true);
            }}
          >
            Restore Type
          </Button>
        </Space>
      }
    >
      <h3>Current Types:</h3>
      <Spin spinning={isLoading}>
        <TypeList data={filteredData} showRestore={false} />
      </Spin>
    </CenteredContainer>
  );
};

export default ConfigurationContainer;
