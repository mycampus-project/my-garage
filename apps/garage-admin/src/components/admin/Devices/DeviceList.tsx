import 'antd/dist/antd.css';
import { List } from 'antd';
import useThing from 'src/hooks/useThing';
import { useLocalStorage, Thing } from '@my-garage/common';
import DeviceListItem from './DeviceListItem';

const DeviceList = () => {
  const [token] = useLocalStorage('auth_token');
  const { data, error, isLoading } = useThing().GetListOfThings(token);

  if (error) {
    return <div>Error</div>;
  }

  const sortedByNameAlphabetically = (dataArray: Thing[]) => {
    function compareByName(a: Thing, b: Thing) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    return dataArray.sort(compareByName);
  };

  const sortedData = data ? sortedByNameAlphabetically(data.data) : new Array<Thing>();

  return (
    <List
      data-testid="userList"
      loading={isLoading}
      style={{ width: '100%' }}
      dataSource={sortedData}
      renderItem={(item) => <DeviceListItem item={item} />}
    />
  );
};

export default DeviceList;
