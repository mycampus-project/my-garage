import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient, Thing } from '@my-garage/common';

const useThing = () => {
  function GetListOfThings(token: string) {
    const {
      data: listOfThings,
      error: listOfThingsError,
      isLoading: listOfThingsIsLoading,
    } = useQuery<AxiosResponse<Thing[]> | null, AxiosError>(
      ['things'],
      () => {
        if (!token) return Promise.resolve(null);
        return apiClient.get<Thing[]>('/things/', {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
      {
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    );

    return { listOfThings, listOfThingsError, listOfThingsIsLoading };
  }

  return { GetListOfThings };
};

export default useThing;
