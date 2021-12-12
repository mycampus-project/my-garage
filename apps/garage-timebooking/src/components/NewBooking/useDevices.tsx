import { apiClient, Thing } from '@my-garage/common';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from 'src/contexts/AuthContext';

const useDevices = () => {
  const { token } = useContext(AuthContext);

  return useQuery(['devices', token], () =>
    apiClient
      .get<Array<Thing>>('/things', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.data)
      .then((things) => things.filter((item) => !item.removedAt)),
  );
};

export default useDevices;
