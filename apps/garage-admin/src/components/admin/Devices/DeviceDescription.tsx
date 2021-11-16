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

  return (
    <>
      <StyledDescriptions title="User Details" bordered column={1}>
        <Descriptions.Item className="testDescriptionItem" label="Name">
          {selectedThing.name}
        </Descriptions.Item>
        <Descriptions.Item label="Type">{selectedThing.type}</Descriptions.Item>
        <Descriptions.Item label="Description">{selectedThing.description}</Descriptions.Item>
        <Descriptions.Item label="Created At">{selectedThing.createdAt.toString}</Descriptions.Item>
        <Descriptions.Item label="Created By">{selectedThing.createdBy}</Descriptions.Item>
        <Descriptions.Item label="Is Available">
          {selectedThing.isAvailable ? 'Available' : 'Unavailable'}
        </Descriptions.Item>
      </StyledDescriptions>
    </>
  );
};

export default DeviceDescription;
