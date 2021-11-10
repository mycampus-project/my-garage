import { useContext } from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Button, Space } from 'antd';
import styled from 'styled-components';
import TabsCard from './TabCard';
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
  justify-content: end;
`;

const avatar = (
  <Avatar
    size={{ xs: 50, sm: 100, md: 100, lg: 100, xl: 100, xxl: 150 }}
    src="https://randomuser.me/api/portraits/men/75.jpg"
  />
);

function UserDetails() {
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
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setAlertMessage('update successful');
                  setAlertType('success');
                }}
              >
                Edit
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
          <UserDescription />

          <TabsCard />
        </Card>
      </>
    );
  }
  return null;
}

export default UserDetails;
