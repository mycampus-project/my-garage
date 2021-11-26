import { apiClient, Type, useLocalStorage } from '@my-garage/common';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import openNotificationWithIcon from 'src/components/admin/Common/OpenNotificationWithIcon';

const useType = () => {
  const client = useQueryClient();
  // const { setModelIsVisible } = useContext(AdminContext);
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
      data: responseThingData,
      isLoading: isLoadingAddThing,
      error: addThingError,
    } = useMutation<
      Type,
      AxiosError,
      {
        name: string;
      }
    >(
      ['addType'],
      ({ name }) =>
        apiClient
          .post(
            '/types',
            { name },
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
    return { onSubmit, responseThingData, isLoadingAddThing, addThingError };
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
  return { GetListOfTypes, AddType, DeleteType, RestoreType };
};

export default useType;
