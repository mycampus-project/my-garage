import { useContext } from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Space, Button } from 'antd';
import styled from 'styled-components';
import BookingsTabsCard from '../Common/BookingsTabCard';
import { AdminContext } from '../../../contexts/AdminContext';
import UserDescription from './UserDescription';
import openNotificationWithIcon from '../Common/OpenNotificationWithIcon';

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
    src="https://randomuser.me/api/portraits/men/75.jpg"
  />
);

// Selected user panel to display user information, and their current and previous bookings.
// has buttons to toggle user role and delete user from list.
function UserInfoPanel() {
  const { selectedUser } = useContext(AdminContext);

  if (selectedUser.fullName.length > 0) {
    return (
      <>
        <StyledCard title={selectedUser.fullName} extra={avatar}>
          <ButtonContainer>
            <UserDescription />
            <Space align="start">
              <Button
                type="primary"
                onClick={() => openNotificationWithIcon('info', 'test', 'test')}
              >
                Toggle Role
              </Button>
              <Button
                type="primary"
                onClick={() => openNotificationWithIcon('info', 'test', 'test')}
              >
                Delete
              </Button>
            </Space>
          </ButtonContainer>

          <BookingsTabsCard />
        </StyledCard>
      </>
    );
  }
  return null;
}

export default UserInfoPanel;
