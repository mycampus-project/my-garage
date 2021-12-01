import 'antd/dist/antd.css';
import useThing from 'src/hooks/useThing';
import { Thing } from '@my-garage/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { List } from 'antd';
import sortedThingArray from 'src/utilities/utilityFunctions';
import RestoreDeviceListItem from './RestoreDeviceListItem';

const StyledListContainer = styled.div`
  max-height: 800px;
  overflow: auto;
`;

const RestoreDeviceList = () => {
  const { data, error, isLoading } = useThing().GetListOfThings();
  const [filteredData, setFilteredData] = useState<Thing[]>([]);

  useEffect(() => {
    const sortedData = data ? sortedThingArray(data.data, 'name') : new Array<Thing>();
    const filteredArray = sortedData.filter((item: Thing) => item.removedBy !== undefined);
    setFilteredData(filteredArray);
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <StyledListContainer>
      <List
        data-testid="restoreDeviceList"
        loading={isLoading}
        style={{ width: '100%' }}
        dataSource={filteredData}
        renderItem={(item: Thing) => <RestoreDeviceListItem item={item} showRestoreButtons />}
      />
    </StyledListContainer>
  );
};

export default RestoreDeviceList;
