import { useContext } from 'react';
import { Descriptions } from 'antd';
import { AdminContext } from '../Common/AdminContext';

const UserDescription = () => {
  const { userSelected } = useContext(AdminContext);

  return (
    <Descriptions
      title="User Details"
      bordered
      column={1}
      style={{ marginBottom: '32px', marginTop: '8px', width: '70%' }}
    >
      <Descriptions.Item label={<h4 style={{ fontWeight: 500 }}>Full Name</h4>}>
        {userSelected.fullName}
      </Descriptions.Item>
      <Descriptions.Item label={<h4 style={{ fontWeight: 500 }}>Email</h4>}>
        {userSelected.email}
      </Descriptions.Item>
      <Descriptions.Item label={<h4 style={{ fontWeight: 500 }}>Role</h4>}>
        {userSelected.role.name}
      </Descriptions.Item>
      <Descriptions.Item label={<h4 style={{ fontWeight: 500 }}>Created At</h4>}>
        {userSelected.createdAt.toString}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserDescription;
