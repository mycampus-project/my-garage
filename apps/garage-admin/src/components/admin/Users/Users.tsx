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

  const banner = (
    <Banner data-testid="banner" title="Users" alertMessage={alertMessage} alertType={alertType} />
  );

  const userMainContainer = <MainContainer list={<UserList />} details={<UserInfoPanel />} />;

  return <PageLayout Title={banner} Element={userMainContainer} />;
}

export default Users;
