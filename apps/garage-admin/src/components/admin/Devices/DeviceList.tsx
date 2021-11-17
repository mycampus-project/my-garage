import 'antd/dist/antd.css';
import { List } from 'antd';
import useThing from 'src/hooks/useThing';
import { useLocalStorage } from '@my-garage/common';
import DeviceListItem from './DeviceListItem';

const DeviceList = () => {
  const [token] = useLocalStorage('auth_token');
  const { data, error, isLoading } = useThing().GetListOfThings(token);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <List
      data-testid="userList"
      loading={isLoading}
      style={{ width: '100%' }}
      dataSource={data?.data}
      renderItem={(item) => <DeviceListItem item={item} />}
    />
  );
};

export default DeviceList;
