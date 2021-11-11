import { useContext } from 'react';
import { AdminContext } from '../Common/AdminContext';
import PageLayout from '../Common/PageLayout';
import UserContainer from './UserContainer';

import Banner from '../Common/Banner';

// Entry point to the users webpage.
function Users() {
  const { alertType, alertMessage } = useContext(AdminContext);

  return (
    <PageLayout
      Title={<Banner title="Users" alertMessage={alertMessage} alertType={alertType} />}
      Element={<UserContainer />}
    />
  );
}

export default Users;
