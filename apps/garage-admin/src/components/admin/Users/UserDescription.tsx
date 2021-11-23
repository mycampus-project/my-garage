import { useContext } from 'react';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';

const StyledDescriptions = styled(Descriptions)`
  margin-bottom: 32px;
  margin-top: 8px;
  width: 100%;

  table {
    table-layout: fixed;
    width: 100%;

    td {
      width: 50%;
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

  return (
    <>
      <StyledDescriptions
        title="User Details"
        bordered
        size="small"
        column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item className="testDescriptionItem" label="Full Name">
          {selectedUser.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{selectedUser.role}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(selectedUser.createdAt).toDateString()}
        </Descriptions.Item>
      </StyledDescriptions>
    </>
  );
};

export default UserDescription;
