import 'antd/dist/antd.css';
import { Card } from 'antd';
import { User } from '@my-garage/common';

const Style = {
  card: {
    width: '100%',
    height: '100%',
    margin: '0',
  },
};

interface UserDetailsProps {
  userDetail: User;
}

function UserDetails({ userDetail }: UserDetailsProps) {
  return (
    <>
      <Card title={userDetail.fullName} style={Style.card}>
        <p>{userDetail.email}</p>
      </Card>
    </>
  );
}

export default UserDetails;
