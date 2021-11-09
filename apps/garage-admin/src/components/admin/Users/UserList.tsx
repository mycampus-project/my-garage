import { useState } from 'react';
import 'antd/dist/antd.css';
import { List, Avatar } from 'antd';
import styled from 'styled-components';

const stylingObject = {
  listItem: {
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    textAlign: 'center' as 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
};

const Name = styled.h1`
  margin: 0;
`;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const arrayOfUsers: User[] = [
  {
    id: 1,
    name: 'Fred Jones',
    email: 'fredjones@fake.com',
    role: 'Admin',
    createdAt: '05/31/2021 14:03:28',
  },
  {
    id: 2,
    name: 'Mary Lamb',
    email: 'marylamb@fake.com',
    role: 'User',
    createdAt: '08/30/2021 16:58:28',
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'johnsmith@fake.com',
    role: 'User',
    createdAt: '04/20/2021 08:07:55',
  },
  {
    id: 4,
    name: 'Joe Bloggs',
    email: 'joebloggs@fake.com',
    role: 'User',
    createdAt: '02/17/2021 12:11:32',
  },
  {
    id: 5,
    name: 'Jane Doe',
    email: 'janedoe@fake.com',
    role: 'User',
    createdAt: '09/08/2021 10:35:04',
  },
  {
    id: 6,
    name: 'Fred Jones',
    email: 'fredjones@fake.com',
    role: 'Admin',
    createdAt: '05/31/2021 14:03:28',
  },
  {
    id: 7,
    name: 'Mary Lamb',
    email: 'marylamb@fake.com',
    role: 'User',
    createdAt: '08/30/2021 16:58:28',
  },
  {
    id: 8,
    name: 'John Smith',
    email: 'johnsmith@fake.com',
    role: 'User',
    createdAt: '04/20/2021 08:07:55',
  },
  {
    id: 9,
    name: 'Joe Bloggs',
    email: 'joebloggs@fake.com',
    role: 'User',
    createdAt: '02/17/2021 12:11:32',
  },
  {
    id: 10,
    name: 'Jane Doe',
    email: 'janedoe@fake.com',
    role: 'User',
    createdAt: '09/08/2021 10:35:04',
  },
];

const UserList = () => {
  const [data] = useState([...arrayOfUsers]);

  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            style={stylingObject.listItem}
            avatar={<Avatar size={64} src="https://randomuser.me/api/portraits/men/75.jpg" />}
            title={<Name>{item.name}</Name>}
          />
        </List.Item>
      )}
    />
  );
};

export default UserList;
