import { useContext } from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Button, Space } from 'antd';
import styled from 'styled-components';
import TabsCard from './BookingsTabCard';
import { AdminContext } from '../Common/AdminContext';
import UserDescription from './UserDescription';

const Style = {
  card: {
    width: '100%',
    height: '100%',
    margin: '0',
  },
  cardHeader: {
    fontSize: '28px',
  },
};

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
  const { userSelected, setAlertMessage, setAlertType } = useContext(AdminContext);

  if (userSelected.fullName.length > 0) {
    return (
      <>
        <Card
          title={userSelected.fullName}
          style={Style.card}
          headStyle={Style.cardHeader}
          extra={avatar}
        >
          <ButtonContainer>
            <UserDescription />
            <Space align="start">
              <Button
                type="primary"
                onClick={() => {
                  setAlertMessage('change role successful');
                  setAlertType('success');
                }}
              >
                Toggle Role
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setAlertMessage('delete unsuccessful');
                  setAlertType('error');
                }}
              >
                Delete
              </Button>
            </Space>
          </ButtonContainer>

          <TabsCard />
        </Card>
      </>
    );
  }
  return null;
}

export default UserInfoPanel;
