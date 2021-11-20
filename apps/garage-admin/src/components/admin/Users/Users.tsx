import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import PageLayout from '../Common/PageLayout';
import MainContainer from '../Common/MainContainer';
import Banner from '../Common/Banner';
import UserList from './UserList';
import UserInfoPanel from './UserInfoPanel';
import ModelLauncher from '../Common/ModelLauncher';

// Entry point to the users webpage.
function Users() {
  const { modelIsVisible } = useContext(AdminContext);

  return (
    <>
      {modelIsVisible && <ModelLauncher />}
      <PageLayout
        Title={<Banner data-testid="banner" title="Users" showRestoreUser />}
        Element={<MainContainer list={<UserList />} details={<UserInfoPanel />} />}
      />
    </>
  );
}

export default Users;
