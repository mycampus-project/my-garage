import WebLayout from '../Common/WebLayout';
import UserList from './UserList';
import UserDetails from './UserDetails';
import Banner from '../Common/Banner';

function Users() {
  return (
    <WebLayout
      Title={<Banner Title="Users" AlertMessage="Success" AlertType="success" />}
      List={<UserList />}
      Details={<UserDetails />}
    />
  );
}

export default Users;
