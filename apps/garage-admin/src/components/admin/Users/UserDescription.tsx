import { useContext } from 'react';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';

const StyledDescriptions = styled(Descriptions)`
  margin-bottom: 32px;
  margin-top: 8px;
  width: 70%;

  .ant-descriptions-item-label > span {
    font-weight: 600;
  }
`;

const UserDescription = () => {
  const { selectedUser } = useContext(AdminContext);

  return (
    <>
      <StyledDescriptions title="User Details" bordered column={1}>
        <Descriptions.Item className="testDescriptionItem" label="Full Name">
          {selectedUser.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{selectedUser.role}</Descriptions.Item>
        <Descriptions.Item label="Created At">{selectedUser.createdAt.toString}</Descriptions.Item>
      </StyledDescriptions>
    </>
  );
};

export default UserDescription;
