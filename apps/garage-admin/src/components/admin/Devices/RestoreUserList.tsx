import 'antd/dist/antd.css';
import { User } from '@my-garage/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { List } from 'antd';
import useUser from 'src/hooks/useUser';
import RestoreUserListItem from '../Users/RestoreUserListItem';

const StyledListContainer = styled.div`
  max-height: 800px;
  overflow: auto;
`;

const RestoreDeviceList = () => {
  const { data, error, isLoading } = useUser().GetListOfUsers();
  const [filteredData, setFilteredData] = useState<User[]>([]);

  const sortedByNameAlphabetically = (dataArray: User[]) => {
    function compareByName(a: User, b: User) {
      if (a.fullName < b.fullName) {
        return -1;
      }
      if (a.fullName > b.fullName) {
        return 1;
      }
      return 0;
    }

    return dataArray.sort(compareByName);
  };

  useEffect(() => {
    const sortedData = data ? sortedByNameAlphabetically(data.data) : new Array<User>();
    const filteredArray = sortedData.filter((item: User) => item.removedAt !== undefined);
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
        renderItem={(item: User) => <RestoreUserListItem item={item} showRestoreButtons />}
      />
    </StyledListContainer>
  );
};

export default RestoreDeviceList;
