import { useContext } from 'react';
import { AdminContext } from '../Common/AdminContext';
import WebLayout from '../Common/WebLayout';
import UserContainer from './UserContainer';

import Banner from '../Common/Banner';

function Users() {
  const { alertType, alertMessage } = useContext(AdminContext);

  return (
    <WebLayout
      Title={<Banner title="Users" alertMessage={alertMessage} alertType={alertType} />}
      Element={<UserContainer />}
    />
  );
}

export default Users;
