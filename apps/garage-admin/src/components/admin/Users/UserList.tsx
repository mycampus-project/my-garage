import { useState } from 'react';
import 'antd/dist/antd.css';
import { List, Avatar } from 'antd';
import styled from 'styled-components';
import { User, Role } from '@my-garage/common';

const userRole: Role = {
  name: 'User',
  createdAt: new Date('05/31/2021 14:03:28'),
};

const adminRole: Role = {
  name: 'Admin',
  createdAt: new Date('05/31/2021 14:03:28'),
};

const arrayOfUsers: User[] = [
  {
    fullName: 'Fred Jones',
    email: 'fredjones@fake.com',
    role: userRole,
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    fullName: 'Mary Lamb',
    email: 'marylamb@fake.com',
    role: adminRole,
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    fullName: 'Billy Bob',
    email: 'billybob@fake.com',
    role: adminRole,
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    fullName: 'Joe Bloggs',
    email: 'joebloggs@fake.com',
    role: userRole,
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    fullName: 'Jane Doe',
    email: 'janedoe@fake.com',
    role: userRole,
    createdAt: new Date('09/08/2021 10:35:04'),
  },
  {
    fullName: 'Fred Jones2',
    email: 'fredjones2@fake.com',
    role: userRole,
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    fullName: 'Mary Lamb2',
    email: 'marylamb2@fake.com',
    role: adminRole,
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    fullName: 'Billy Bob2',
    email: 'billybob2@fake.com',
    role: adminRole,
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    fullName: 'Joe Bloggs2',
    email: 'joebloggs2@fake.com',
    role: userRole,
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    fullName: 'Jane Doe2',
    email: 'janedoe2@fake.com',
    role: userRole,
    createdAt: new Date('09/08/2021 10:35:04'),
  },
  {
    fullName: 'Fred Jones3',
    email: 'fredjones3@fake.com',
    role: userRole,
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    fullName: 'Mary Lamb3',
    email: 'marylamb3@fake.com',
    role: adminRole,
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    fullName: 'Billy Bob3',
    email: 'billybob3@fake.com',
    role: adminRole,
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    fullName: 'Joe Bloggs3',
    email: 'joebloggs3@fake.com',
    role: userRole,
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    fullName: 'Jane Doe3',
    email: 'janedoe2@fake.com',
    role: userRole,
    createdAt: new Date('09/08/2021 10:35:04'),
  },
];

const Name = styled.h1`
  margin: 0;
  margin-bottom: -8px;
`;

const listItemStyle = {};

const listItemMeta = {
  padding: '8px 16px',
  cursor: 'pointer',
};

interface UserListProps {
  onClick: (name: User) => void;
}

const UserList = ({ onClick }: UserListProps) => {
  const [data] = useState([...arrayOfUsers]);

  return (
    <List
      style={{ width: '100%' }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item onClick={() => onClick(item)} key={item.fullName} style={listItemStyle}>
          <List.Item.Meta
            style={listItemMeta}
            avatar={<Avatar size={48} src="https://randomuser.me/api/portraits/men/75.jpg" />}
            title={<Name>{item.fullName}</Name>}
            description={item.email}
          />
        </List.Item>
      )}
    />
  );
};

export default UserList;
