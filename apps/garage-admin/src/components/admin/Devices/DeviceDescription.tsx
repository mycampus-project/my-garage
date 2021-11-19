import { useContext } from 'react';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';

const StyledDescriptions = styled(Descriptions)`
  margin-bottom: 32px;
  margin-top: 8px;
  width: 70%;

  table {
    table-layout: fixed;
    width: 100%;

    td {
      width: 70%;
      overflow: hidden;
    }
  }

  .ant-descriptions-item-label {
    min-width: 40%;
  }

  .ant-descriptions-item-label > span {
    font-weight: 600;
  }
`;

const DeviceDescription = () => {
  const { selectedThing } = useContext(AdminContext);

  const removedDate = selectedThing.removedAt
    ? new Date(selectedThing.removedAt).toDateString()
    : '';

  return (
    <>
      <StyledDescriptions title="User Details" bordered column={1}>
        <Descriptions.Item className="testDescriptionItem" label="Name">
          {selectedThing.name}
        </Descriptions.Item>
        <Descriptions.Item label="ID">{selectedThing.id}</Descriptions.Item>
        <Descriptions.Item label="Type">{selectedThing.type}</Descriptions.Item>
        <Descriptions.Item label="Description">{selectedThing.description}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(selectedThing.createdAt).toDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Removed At">{removedDate}</Descriptions.Item>
        <Descriptions.Item label="Removed By">
          {selectedThing.removedBy?.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Created By">{selectedThing.createdBy.fullName}</Descriptions.Item>
        <Descriptions.Item label="Is Available">
          {selectedThing.isAvailable ? 'Available' : 'Unavailable'}
        </Descriptions.Item>
      </StyledDescriptions>
    </>
  );
};

export default DeviceDescription;
