import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient, Thing, useLocalStorage } from '@my-garage/common';
import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import openNotificationWithIcon from '../components/admin/Common/OpenNotificationWithIcon';

const useThing = () => {
  const client = useQueryClient();
  const { setModelIsVisible, setSelectedThing } = useContext(AdminContext);
  const [token] = useLocalStorage('auth_token');

  function GetListOfThings() {
    const { data, error, isLoading } = useQuery<AxiosResponse<Thing[]> | null, AxiosError>(
      ['things'],
      () => {
        if (!token) return Promise.resolve(null);
        return apiClient.get<Thing[]>('/things', {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
    );

    return { data, error, isLoading };
  }

  function AddThing() {
    const {
      mutate: onSubmit,
      data: responseThingData,
      isLoading: isLoadingAddThing,
      error: addThingError,
    } = useMutation<
      Thing,
      AxiosError,
      {
        token: string;
        name: string;
        description: string;
        type: string;
        isAvailable: boolean;
        contactPerson: string;
        image: File;
      }
    >(
      ['addThing'],
      ({ name, description, type, isAvailable, image, contactPerson }) => {
        const newFormData = new FormData();
        newFormData.append('name', name);
        newFormData.append('description', description);
        newFormData.append('type', type);
        newFormData.append('contactPerson', contactPerson);
        newFormData.append('isAvailable', JSON.stringify(isAvailable));
        if (image !== undefined) {
          newFormData.append('image', image);
        }

        return apiClient
          .post('/things', newFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => response.data);
      },
      {
        onSuccess: (data) => {
          client.invalidateQueries('things');
          openNotificationWithIcon(
            'success',
            'Device Added',
            `${data.name} was successfully added.`,
          );
          setSelectedThing(data);
          setModelIsVisible(false);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Device Not Added', `${error.message}`);
        },
      },
    );
    return { onSubmit, responseThingData, isLoadingAddThing, addThingError };
  }

  function DeleteThing() {
    const {
      mutate: onDelete,
      data: respDeleteThingData,
      isLoading: isLoadingDeleteThing,
      error: deleteThingError,
    } = useMutation<Thing, AxiosError, string>(
      ['deleteThing'],
      (thingId: string) =>
        apiClient
          .delete(`/things/${thingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => response.data),
      {
        onSuccess: (data) => {
          client.invalidateQueries('things');
          openNotificationWithIcon(
            'success',
            'Device Deleted',
            `${data.name} was successfully deleted`,
          );

          setSelectedThing(null);
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

  function UpdateThing() {
    const {
      mutate: onUpdate,
      data: respUpdateThingData,
      isLoading: isLoadingUpdateThing,
      error: updateThingError,
    } = useMutation<
      Thing,
      AxiosError,
      {
        thingId: string;
        name: string;
        description: string;
        type: string;
        isAvailable: boolean;
        contactPerson: string;
        image: File;
      }
    >(
      ['updateThing'],
      ({ thingId, name, description, type, isAvailable, image, contactPerson }) => {
        const newFormData = new FormData();
        newFormData.append('name', name);
        newFormData.append('description', description);
        newFormData.append('type', type);
        newFormData.append('contactPerson', contactPerson);
        newFormData.append('isAvailable', JSON.stringify(isAvailable));
        if (image !== undefined) {
          newFormData.append('image', image);
        }

        return apiClient
          .put(`/things/${thingId}`, newFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => response.data);
      },
      {
        onSuccess: (data) => {
          client.invalidateQueries('things');
          openNotificationWithIcon(
            'success',
            'Device Updated',
            `${data.name} was successfully updated`,
          );

          setSelectedThing(data);
          setModelIsVisible(false);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Device Not Updated', `${error.message}`);
        },
      },
    );
    return {
      onUpdate,
      respUpdateThingData,
      isLoadingUpdateThing,
      updateThingError,
    };
  }

  function RestoreThing() {
    const {
      mutate: onRestore,
      data: respRestoreThingData,
      isLoading: isLoadingRestoreThing,
      error: restoreError,
    } = useMutation<Thing, AxiosError, string>(
      ['restoreThing'],
      (thingId: string) =>
        apiClient
          .put(
            `/things/${thingId}/restore`,
            {},
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
            'Device Restored',
            `${data.name} was successfully restored`,
          );
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Device Not Restored', `${error.message}`);
        },
      },
    );
    return {
      onRestore,
      respRestoreThingData,
      isLoadingRestoreThing,
      restoreError,
    };
  }

  return { GetListOfThings, AddThing, DeleteThing, UpdateThing, RestoreThing };
};

export default useThing;
