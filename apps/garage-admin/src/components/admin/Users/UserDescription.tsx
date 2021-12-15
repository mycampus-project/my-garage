import { useContext } from 'react';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';

const StyledDescriptions = styled(Descriptions)`
  margin-bottom: 32px;
  margin-top: 8px;
  min-width: 400px;
  width: 70%;

  table {
    table-layout: fixed;
    width: 100%;

    td {
      overflow: hidden;
    }
  }

  .ant-descriptions-item-label {
    min-width: 40%;
  }

  .ant-descriptions-item-label > span {
    font-weight: 600;
  }

  .ant-descriptions-item-content > span {
    font-size: 14px;
  }
`;

const UserDescription = () => {
  const { selectedUser } = useContext(AdminContext);

  if (selectedUser) {
    return (
      <div data-testid="details.table.user">
        <StyledDescriptions
          title="User Details"
          bordered
          size="small"
          column={{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item className="testDescriptionItem" label="Full Name">
            {selectedUser?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="ID">{selectedUser.id}</Descriptions.Item>
          <Descriptions.Item className="testIsRoleUser" label="Is Role">
            {selectedUser.role ? 'admin' : 'user'}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{selectedUser?.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{selectedUser?.role}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(selectedUser ? selectedUser.createdAt : '').toDateString()}
          </Descriptions.Item>
        </StyledDescriptions>
      </div>
    );
  }
  return null;
};

export default UserDescription;
