import { useContext } from 'react';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import { AdminContext } from '../../../contexts/AdminContext';
import openNotificationWithIcon from '../Common/OpenNotificationWithIcon';

const StyledDescriptions = styled(Descriptions)`
  margin-bottom: 32px;
  margin-top: 8px;
  width: 100%;

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

const DeviceDescription = () => {
  const { selectedThing } = useContext(AdminContext);

  if (selectedThing === null) {
    openNotificationWithIcon('error', 'Error with SelectedType', 'Selected Type returns null');
    return <div>Error</div>;
  }

  return (
    <div data-testid="details.table">
      <StyledDescriptions
        title="Device Details"
        bordered
        size="small"
        column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Name">{selectedThing.name}</Descriptions.Item>

        <Descriptions.Item label="ID">{selectedThing.id}</Descriptions.Item>
        <Descriptions.Item className="testIsAvailableItem" label="Is Available">
          {selectedThing.isAvailable ? 'Available' : 'Unavailable'}
        </Descriptions.Item>
        <Descriptions.Item label="Type">{selectedThing.type}</Descriptions.Item>

        <Descriptions.Item label="Created At">
          {new Date(selectedThing.createdAt).toDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Created By">{selectedThing.createdBy.fullName}</Descriptions.Item>
        <Descriptions.Item label="Description">{selectedThing.description}</Descriptions.Item>
      </StyledDescriptions>
    </div>
  );
};

export default DeviceDescription;
