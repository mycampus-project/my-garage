import 'antd/dist/antd.css';
import { Card } from 'antd';
import { User } from '@my-garage/common';
import TabsCard from './TabCard';

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

interface UserDetailsProps {
  userDetail: User;
}

function UserDetails({ userDetail }: UserDetailsProps) {
  if (userDetail.fullName.length > 0) {
    return (
      <>
        <Card title={userDetail.fullName} style={Style.card} headStyle={Style.cardHeader}>
          <p>{userDetail.email}</p>
          <TabsCard />
        </Card>
      </>
    );
  }
  return null;
}

export default UserDetails;
