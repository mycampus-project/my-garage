import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import useUser from 'src/hooks/useUser';
import { User } from '@my-garage/common';
import UserListItem from './UserListItem';

const UserList = () => {
  const { data, error, isLoading } = useUser().GetListOfUsers();
  const [filteredData, setFilteredData] = useState<User[]>([]);

  const sortedArray = (dataArray: User[]) => {
    function compareByType(a: User, b: User) {
      if (a.fullName < b.fullName) {
        return -1;
      }
      if (a.fullName > b.fullName) {
        return 1;
      }
      return 0;
    }

    return dataArray.sort(compareByType);
  };

  useEffect(() => {
    const sortedData = data ? sortedArray(data.data) : new Array<User>();
    const filteredArray = sortedData.filter((item: User) => item.removedBy === undefined);
    setFilteredData(filteredArray);
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <List
      data-testid="userList"
      loading={isLoading}
      style={{ width: '100%' }}
      dataSource={filteredData}
      renderItem={(item) => <UserListItem item={item} />}
    />
  );
};

export default UserList;
