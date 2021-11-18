import { useContext } from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Space, Button } from 'antd';
import styled from 'styled-components';
import BookingsTabsCard from '../Common/BookingsTabCard';
import { AdminContext } from '../../../contexts/AdminContext';
import DeviceDescription from './DeviceDescription';

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  margin: 0;

  .ant-card-head-title {
    font-size: 28px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const avatar = (
  <Avatar
    size={{ xs: 50, sm: 100, md: 100, lg: 100, xl: 100, xxl: 150 }}
    src="https://randomuser.me/api/portraits/men/22.jpg"
  />
);

// Selected user panel to display user information, and their current and previous bookings.
// has buttons to toggle user role and delete user from list.
function DeviceInfoPanel() {
  const { selectedThing, setModelIsVisible, setModelType } = useContext(AdminContext);

  if (selectedThing.name.length > 0) {
    return (
      <>
        <StyledCard title={selectedThing.name} extra={avatar}>
          <ButtonContainer>
            <DeviceDescription />
            <Space align="start">
              <Button
                type="primary"
                onClick={() => {
                  setModelType('edit-device');
                  setModelIsVisible(true);
                }}
              >
                Edit
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setModelType('delete-device');
                  setModelIsVisible(true);
                }}
              >
                Delete
              </Button>
            </Space>
          </ButtonContainer>

          <BookingsTabsCard things />
        </StyledCard>
      </>
    );
  }
  return null;
}

export default DeviceInfoPanel;
