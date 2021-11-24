import 'antd/dist/antd.css';
import { Type } from '@my-garage/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { List } from 'antd';
import useType from 'src/hooks/useType';
import TypeListItem from './TypeListItem';

interface TypeListProps {
  showRestoreData?: boolean;
}

const defaultProps = {
  showRestoreData: false,
};

const StyledListContainer = styled.div`
  max-height: 800px;
  overflow: auto;
  width: 100%;
`;

const TypeList = ({ showRestoreData }: TypeListProps) => {
  const { data, error } = useType().GetListOfTypes();
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
    const filteredArray = showRestoreData
      ? sortedData.filter((item: Type) => item.removedBy !== undefined)
      : sortedData.filter((item: Type) => item.removedBy === undefined);
    setFilteredData(filteredArray);
  }, [data, showRestoreData]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <StyledListContainer>
      <List
        data-testid="typeList"
        style={{ width: '100%' }}
        dataSource={filteredData}
        renderItem={(item: Type) => (
          <TypeListItem key={item.id} item={item} showRestoreButtons={showRestoreData} />
        )}
      />
    </StyledListContainer>
  );
};

TypeList.defaultProps = defaultProps;

export default TypeList;
