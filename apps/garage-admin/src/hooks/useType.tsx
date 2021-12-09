import { apiClient, Type, useLocalStorage } from '@my-garage/common';
import { AxiosError, AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import openNotificationWithIcon from 'src/components/admin/Common/OpenNotificationWithIcon';
import { AdminContext } from 'src/contexts/AdminContext';

const useType = () => {
  const client = useQueryClient();
  const { setModelIsVisible } = useContext(AdminContext);
  const [token] = useLocalStorage('auth_token');

  function GetListOfTypes() {
    const { data, error, isLoading } = useQuery<AxiosResponse<Type[]> | null, AxiosError>(
      ['types'],
      () => {
        if (!token) return Promise.resolve(null);
        return apiClient.get<Type[]>('/types', {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
    );

    return { data, error, isLoading };
  }

  function AddType() {
    const {
      mutate: onSubmit,
      data: responseTypeData,
      isLoading: isLoadingAddType,
      error: addTypeError,
    } = useMutation<
      Type,
      AxiosError,
      {
        name: string;
        maxBookingDuration: number;
      }
    >(
      ['addType'],
      ({ name, maxBookingDuration }) =>
        apiClient
          .post(
            '/types',
            { name, maxBookingDuration },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) => response.data),
      {
        onSuccess: (data) => {
          client.invalidateQueries('types');
          openNotificationWithIcon('success', 'Type Added', `${data.name} was successfully added.`);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Type Not Added', `${error.message}`);
        },
      },
    );
    return { onSubmit, responseTypeData, isLoadingAddType, addTypeError };
  }

  function UpdateType() {
    const {
      mutate: onUpdate,
      data: responseTypeData,
      isLoading: isLoadingupdateType,
      error: updateTypeError,
    } = useMutation<
      Type,
      AxiosError,
      {
        typeId: string;
        name: string;
        maxBookingDuration: number;
      }
    >(
      ['updateType'],
      ({ typeId, name, maxBookingDuration }) =>
        apiClient
          .put(
            `/types/${typeId}`,
            { name, maxBookingDuration },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) => response.data),
      {
        onSuccess: (data) => {
          client.invalidateQueries('types');
          openNotificationWithIcon('success', 'Type Added', `${data.name} was successfully added.`);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Type Not Added', `${error.message}`);
        },
      },
    );
    return { onUpdate, responseTypeData, isLoadingupdateType, updateTypeError };
  }

  function DeleteType() {
    const {
      mutate: onDelete,
      data: respDeleteTypeData,
      isLoading: isLoadingDeleteType,
      error: deleteTypeError,
    } = useMutation<Type, AxiosError, string>(
      ['deleteType'],
      (typeId: string) =>
        apiClient
          .delete(`/types/${typeId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => response.data),
      {
        onSuccess: (data) => {
          client.invalidateQueries('types');
          openNotificationWithIcon(
            'success',
            'Type Deleted',
            `${data.name} was successfully deleted`,
          );
          setModelIsVisible(false);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Type Not Deleted', `${error.message}`);
        },
      },
    );
    return {
      onDelete,
      respDeleteTypeData,
      isLoadingDeleteType,
      deleteTypeError,
    };
  }

  function RestoreType() {
    const {
      mutate: onRestore,
      data: respRestoreTypeData,
      isLoading: isLoadingRestoreType,
      error: restoreTypeError,
    } = useMutation<Type, AxiosError, string>(
      ['restoreType'],
      (typeId: string) =>
        apiClient
          .put(
            `/types/${typeId}/restore`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          .then((response) => response.data),
      {
        onSuccess: (data) => {
          client.invalidateQueries('types');
          openNotificationWithIcon(
            'success',
            'Type Restored',
            `${data.name} was successfully restored`,
          );
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Type Not Restored', `${error.message}`);
        },
      },
    );
    return {
      onRestore,
      respRestoreTypeData,
      isLoadingRestoreType,
      restoreTypeError,
    };
  }
  return { GetListOfTypes, AddType, DeleteType, RestoreType, UpdateType };
};

export default useType;
