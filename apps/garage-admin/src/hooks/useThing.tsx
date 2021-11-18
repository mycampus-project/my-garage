import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient, Thing } from '@my-garage/common';
import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';

const useThing = () => {
  const client = useQueryClient();
  const { setAlertMessage, setAlertType, setModelIsVisible } = useContext(AdminContext);

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

  function AddThing(token: string) {
    const {
      mutate: onSubmit,
      data: responseThingData,
      isLoading: isLoadingAddThing,
      error: addThingError,
    } = useMutation<
      {
        token: string;
        name: string;
        description: string;
        type: string;
        isAvailable: boolean;
      },
      AxiosError,
      { token: string; name: string; description: string; type: string; isAvailable: boolean }
    >(
      ['addThing'],
      ({ name, description, type, isAvailable }) =>
        apiClient
          .post(
            '/things/',
            {
              name,
              description,
              type,
              isAvailable,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          .then((response) => response.data),
      {
        onSuccess: () => {
          client.invalidateQueries('things');
          setAlertType('success');
          setAlertMessage('Adding device was successful');
        },

        onError: (error) => {
          setAlertType('error');
          setAlertMessage(`${error.message}`);
        },
      },
    );
    return { onSubmit, responseThingData, isLoadingAddThing, addThingError };
  }

  function DeleteThing(token: string) {
    const {
      mutate: onDelete,
      data: respDeleteThingData,
      isLoading: isLoadingDeleteThing,
      error: deleteThingError,
    } = useMutation<string, AxiosError, string>(
      ['deleteThing'],
      (id: string) =>
        apiClient
          .delete('/things/', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              id,
            },
          })
          .then((response) => response.data),
      {
        onSuccess: () => {
          client.invalidateQueries('things');
          setAlertType('success');
          setAlertMessage('Adding device was successful');
          setModelIsVisible(false);
        },

        onError: (error) => {
          setAlertType('error');
          setAlertMessage(`${error.message}`);
          setModelIsVisible(false);
        },
      },
    );
    return {
      onDelete,
      respDeleteThingData,
      isLoadingDeleteThing,
      deleteThingError,
    };
  }
  return { GetListOfThings, AddThing, DeleteThing };
};

export default useThing;
