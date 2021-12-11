import { useContext } from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Space, Button } from 'antd';
import styled from 'styled-components';
import BookingsTabsCard from '../Common/BookingsTabCard';
import { AdminContext } from '../../../contexts/AdminContext';
import UserDescription from './UserDescription';

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
  width: 100%;
  justify-content: space-between;
`;

// Selected user panel to display user information, and their current and previous bookings.
// has buttons to toggle user role and delete user from list.
function UserInfoPanel() {
  const { selectedUser, setModelIsVisible, setModelType } = useContext(AdminContext);

  const buttons = (
    <ButtonContainer>
      <Space direction="vertical" size="large" align="center">
        <Avatar
          size={{ xs: 50, sm: 100, md: 100, lg: 100, xl: 100, xxl: 110 }}
          src="https://randomuser.me/api/portraits/men/75.jpg"
        />
        <Space align="start">
          <Button
            type="primary"
            onClick={() => {
              setModelType('change-role');
              setModelIsVisible(true);
            }}
          >
            Change Role
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setModelType('delete-user');
              setModelIsVisible(true);
            }}
          >
            Delete
          </Button>
        </Space>
      </Space>
    </ButtonContainer>
  );

  if (selectedUser) {
    return (
      <>
        <StyledCard title={selectedUser.fullName} extra={buttons}>
          <UserDescription />
          <BookingsTabsCard />
        </StyledCard>
      </>
    );
  }
  return null;
}

export default UserInfoPanel;
