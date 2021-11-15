import { useContext } from 'react';
import { AdminContext } from '../../../contexts/AdminContext';
import PageLayout from '../Common/PageLayout';
import UserContainer from './UserContainer';
import Banner from '../Common/Banner';

// Entry point to the users webpage.
function Users() {
  const { alertType, alertMessage } = useContext(AdminContext);

  const banner = (
    <Banner data-testid="banner" title="Users" alertMessage={alertMessage} alertType={alertType} />
  );

  return <PageLayout Title={banner} Element={<UserContainer />} />;
}

export default Users;
