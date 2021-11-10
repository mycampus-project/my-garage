import { useContext } from 'react';
import { Descriptions } from 'antd';
import { AdminContext } from '../Common/AdminContext';

const UserDescription = () => {
  const { userSelected } = useContext(AdminContext);

  return (
    <Descriptions
      title="User Details"
      bordered
      column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
      style={{ marginBottom: '32px', marginTop: '8px' }}
    >
      <Descriptions.Item label="Full Name">{userSelected.fullName}</Descriptions.Item>
      <Descriptions.Item label="Email">{userSelected.email}</Descriptions.Item>
      <Descriptions.Item label="Role">{userSelected.role.name}</Descriptions.Item>
      <Descriptions.Item label="Created At">{userSelected.createdAt.toString}</Descriptions.Item>
    </Descriptions>
  );
};

export default UserDescription;
