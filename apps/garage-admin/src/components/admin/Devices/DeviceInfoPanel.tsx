import { useContext } from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Space, Button } from 'antd';
import styled from 'styled-components';
import baseURL from 'src/utilities/api';
import BookingsTabsCard from '../Common/BookingsTabCard';
import { AdminContext } from '../../../contexts/AdminContext';
import DeviceDescription from './DeviceDescription';

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: auto;
  box-sizing: border-box;
  .ant-card-head-title {
    font-size: 28px;
  }

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px var(--ant-primary-2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

// Selected user panel to display user information, and their current and previous bookings.
// has buttons to toggle user role and delete user from list.
function DeviceInfoPanel() {
  const { selectedThing, setModelIsVisible, setModelType } = useContext(AdminContext);

  if (selectedThing) {
    const avatar = (
      <ButtonContainer>
        <Space direction="vertical" size="large" align="center">
          <Avatar
            size={{ xs: 50, sm: 100, md: 100, lg: 100, xl: 100, xxl: 110 }}
            src={`${baseURL}/static/${selectedThing.imageUrl}`}
          />
          <Space align="start">
            <Button
              data-testid="edit.device.btn"
              type="primary"
              onClick={() => {
                setModelType('edit-device');
                setModelIsVisible(true);
              }}
            >
              Edit
            </Button>
            <Button
              data-testid="delete.device.btn"
              type="primary"
              onClick={() => {
                setModelType('delete-device');
                setModelIsVisible(true);
              }}
            >
              Delete
            </Button>
          </Space>
        </Space>
      </ButtonContainer>
    );
    return (
      <StyledCard title={selectedThing.name} extra={avatar}>
        <DeviceDescription />
        <BookingsTabsCard showThings />
      </StyledCard>
    );
  }
  return null;
}

export default DeviceInfoPanel;
