import { Type } from '@my-garage/common';
import { Modal, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import useType from 'src/hooks/useType';
import { AdminContext } from '../../../../contexts/AdminContext';
import TypeList from '../../Dashboards/TypeList';

const RestoreTypesModal = () => {
  const { modelIsVisible, setModelIsVisible } = useContext(AdminContext);

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
    const filteredArray = sortedData.filter((item: Type) => item.removedBy !== undefined);

    setFilteredData(filteredArray);
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Modal
      title="Restore Types"
      centered
      visible={modelIsVisible}
      onCancel={() => setModelIsVisible(false)}
      footer={false}
    >
      <Spin spinning={isLoading}>
        <TypeList data={filteredData} showRestore />
      </Spin>
    </Modal>
  );
};

export default RestoreTypesModal;
