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
      Thing,
      AxiosError,
      {
        token: string;
        name: string;
        description: string;
        type: string;
        isAvailable: boolean;
        image: File;
      }
    >(
      ['addThing'],
      ({ name, description, type, isAvailable, image }) => {
        const newFormData = new FormData();
        newFormData.append('name', name);
        newFormData.append('description', description);
        newFormData.append('type', type);
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
          const newThing: Thing = {
            id: '',
            name: '',
            description: '',
            type: '',
            createdAt: new Date(),
            createdBy: { id: '', fullName: '' },
            isAvailable: true,
            imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
          };
          setSelectedThing(newThing);
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
      Thing,
      AxiosError,
      {
        thingId: string;
        token: string;
        name: string;
        description: string;
        type: string;
        isAvailable: boolean;
        image: File;
      }
    >(
      ['updateThing'],
      ({ thingId, name, description, type, isAvailable, image }) => {
        const newFormData = new FormData();
        newFormData.append('name', name);
        newFormData.append('description', description);
        newFormData.append('type', type);
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
          const newThing: Thing = {
            ...selectedThing,
            name: data.name,
            description: data.description,
            type: data.type,
            isAvailable: data.isAvailable,
            imageUrl: data.imageUrl,
          };
          setSelectedThing(newThing);
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

  function RestoreThing(token: string) {
    const {
      mutate: onRestore,
      data: respRestoreThingData,
      isLoading: isLoadingRestoreThing,
      error: restoreError,
    } = useMutation<Thing, AxiosError, string>(
      ['restoreThing'],
      (thingId: string) =>
        apiClient
          .put(`/things/${thingId}/restore`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => response.data),
      {
        onSuccess: (data) => {
          client.invalidateQueries('things');
          openNotificationWithIcon(
            'success',
            'Device Restored',
            `${data.name} was successfully restored`,
          );

          setModelIsVisible(false);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Device Not Restored', `${error.message}`);
          setModelIsVisible(false);
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
