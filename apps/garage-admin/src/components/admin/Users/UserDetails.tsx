import 'antd/dist/antd.css';
import { Card } from 'antd';

const Style = {
  card: {
    width: '70%',
    height: '70%',
    boxShadow: '2px 2px 15px 2px rgba(0, 0, 0, 0.1)',
  },
};

function UserDetails() {
  return (
    <>
      <Card title="User Name" style={Style.card}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  );
}

export default UserDetails;
