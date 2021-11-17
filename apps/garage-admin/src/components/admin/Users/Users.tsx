import { useContext } from 'react';
import { AdminContext } from '../../../contexts/AdminContext';
import PageLayout from '../Common/PageLayout';
import MainContainer from '../Common/MainContainer';
import Banner from '../Common/Banner';
import UserList from './UserList';
import UserInfoPanel from './UserInfoPanel';

// Entry point to the users webpage.
function Users() {
  const { alertType, alertMessage } = useContext(AdminContext);

  return (
    <PageLayout
      Title={
        <Banner
          data-testid="banner"
          title="Users"
          alertMessage={alertMessage}
          alertType={alertType}
        />
      }
      Element={<MainContainer list={<UserList />} details={<UserInfoPanel />} />}
    />
  );
}

export default Users;
