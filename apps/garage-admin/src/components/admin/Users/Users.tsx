import PageLayout from '../Common/PageLayout';
import MainContainer from '../Common/MainContainer';
import Banner from '../Common/Banner';
import UserList from './UserList';
import UserInfoPanel from './UserInfoPanel';

// Entry point to the users webpage.
function Users() {
  return (
    <PageLayout
      Title={<Banner data-testid="banner" title="Users" showAddThing={false} />}
      Element={<MainContainer list={<UserList />} details={<UserInfoPanel />} />}
    />
  );
}

export default Users;
