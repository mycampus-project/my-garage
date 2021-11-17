import 'antd/dist/antd.css';
import { List } from 'antd';
import useThing from 'src/hooks/useThing';
import { useLocalStorage } from '@my-garage/common';
import DeviceListItem from './DeviceListItem';

const DeviceList = () => {
  const [token] = useLocalStorage('auth_token');
  const { listOfThings, listOfThingsError, listOfThingsIsLoading } =
    useThing().GetListOfThings(token);

  if (listOfThingsError) {
    return <div>Error</div>;
  }

  return (
    <List
      data-testid="userList"
      loading={listOfThingsIsLoading}
      style={{ width: '100%' }}
      dataSource={listOfThings?.data}
      renderItem={(item) => <DeviceListItem item={item} />}
    />
  );
};

export default DeviceList;
