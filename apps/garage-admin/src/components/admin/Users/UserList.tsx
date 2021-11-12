import { useState } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import { User } from '@my-garage/common';
import UserListItem from './UserListItem';

const arrayOfUsers: User[] = [
  {
    id: '1',
    fullName: 'Fred Jones',
    email: 'fredjones@fake.com',
    role: 'User',
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    id: '2',
    fullName: 'Mary Lamb',
    email: 'marylamb@fake.com',
    role: 'Admin',
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    id: '3',
    fullName: 'Billy Bob',
    email: 'billybob@fake.com',
    role: 'Admin',
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    id: '4',
    fullName: 'Joe Bloggs',
    email: 'joebloggs@fake.com',
    role: 'User',
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    id: '5',
    fullName: 'Jane Doe',
    email: 'janedoe@fake.com',
    role: 'User',
    createdAt: new Date('09/08/2021 10:35:04'),
  },
  {
    id: '6',
    fullName: 'Fred Jones2',
    email: 'fredjones2@fake.com',
    role: 'User',
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    id: '7',
    fullName: 'Mary Lamb2',
    email: 'marylamb2@fake.com',
    role: 'User',
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    id: '8',
    fullName: 'Billy Bob2',
    email: 'billybob2@fake.com',
    role: 'User',
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    id: '9',
    fullName: 'Joe Bloggs2',
    email: 'joebloggs2@fake.com',
    role: 'User',
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    id: '10',
    fullName: 'Jane Doe2',
    email: 'janedoe2@fake.com',
    role: 'User',
    createdAt: new Date('09/08/2021 10:35:04'),
  },
  {
    id: '11',
    fullName: 'Fred Jones3',
    email: 'fredjones3@fake.com',
    role: 'User',
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    id: '12',
    fullName: 'Mary Lamb3',
    email: 'marylamb3@fake.com',
    role: 'User',
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    id: '13',
    fullName: 'Billy Bob3',
    email: 'billybob3@fake.com',
    role: 'User',
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    id: '14',
    fullName: 'Joe Bloggs3',
    email: 'joebloggs3@fake.com',
    role: 'User',
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    id: '15',
    fullName: 'Jane Doe3',
    email: 'janedoe2@fake.com',
    role: 'User',
    createdAt: new Date('09/08/2021 10:35:04'),
  },
];

const UserList = () => {
  const [data] = useState([...arrayOfUsers]);

  return (
    <List
      data-testid="UserList"
      style={{ width: '100%' }}
      dataSource={data}
      renderItem={(item) => <UserListItem item={item} />}
    />
  );
};

export default UserList;
