import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient, Thing } from '@my-garage/common';
import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import openNotificationWithIcon from '../components/admin/Common/OpenNotificationWithIcon';

const useThing = () => {
  const client = useQueryClient();
  const { setModelIsVisible, setSelectedThing, selectedThing } = useContext(AdminContext);

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
        onSuccess: (data) => {
          client.invalidateQueries('things');
          openNotificationWithIcon(
            'success',
            'Device Added',
            `${data.name} was successfully added`,
          );
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Device Not Added', `${error.message}`);
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
      (thingId: string) =>
        apiClient
          .delete(`/things/${thingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => response.data),
      {
        onSuccess: () => {
          client.invalidateQueries('things');
          openNotificationWithIcon('success', 'Device Added', 'Device was successfully deleted');
          setModelIsVisible(false);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Device Not Deleted', `${error.message}`);
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

  function UpdateThing(token: string) {
    const {
      mutate: onUpdate,
      data: respUpdateThingData,
      isLoading: isLoadingUpdateThing,
      error: updateThingError,
    } = useMutation<
      {
        id: string;
        token: string;
        name: string;
        description: string;
        type: string;
        isAvailable: boolean;
      },
      AxiosError,
      {
        thingId: string;
        token: string;
        name: string;
        description: string;
        type: string;
        isAvailable: boolean;
      }
    >(
      ['updateThing'],
      ({ thingId, name, description, type, isAvailable }) =>
        apiClient
          .put(
            `/things/${thingId}`,
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
        onSuccess: (data) => {
          client.invalidateQueries('things');
          openNotificationWithIcon(
            'success',
            'Device Updated',
            `${data.name} was successfully updated`,
          );
          const newThing: Thing = {
            ...selectedThing,
            name: data.name,
            description: data.description,
            type: data.type,
            isAvailable: data.isAvailable,
          };
          setSelectedThing(newThing);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Device Not Deleted', `${error.message}`);
        },
      },
    );
    return { onUpdate, isLoadingUpdateThing, updateThingError, respUpdateThingData };
  }

  return { GetListOfThings, AddThing, DeleteThing, UpdateThing };
};

export default useThing;
