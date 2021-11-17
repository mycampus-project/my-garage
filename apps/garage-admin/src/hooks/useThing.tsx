import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient, Thing } from '@my-garage/common';

const useThing = () => {
  function GetListOfThings(token: string) {
    const { data, error, isLoading } = useQuery<AxiosResponse<Thing[]> | null, AxiosError>(
      ['things'],
      () => {
        if (!token) return Promise.resolve(null);
        return apiClient.get<Thing[]>('/things/', {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
    );

    return { data, error, isLoading };
  }

  return { GetListOfThings };
};

export default useThing;
