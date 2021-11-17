import { useState } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import { ArrayOfUsers } from '../../tests/testData';
import UserListItem from './UserListItem';

const UserList = () => {
  const [data] = useState([...ArrayOfUsers]);

  return (
    <List
      data-testid="userList"
      style={{ width: '100%' }}
      dataSource={data}
      renderItem={(item) => <UserListItem item={item} />}
    />
  );
};

export default UserList;
