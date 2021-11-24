import { apiClient, useLocalStorage, User } from '@my-garage/common';
import { AxiosError, AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import openNotificationWithIcon from 'src/components/admin/Common/OpenNotificationWithIcon';
import { AdminContext } from 'src/contexts/AdminContext';

const useUser = () => {
  const client = useQueryClient();
  const { setModelIsVisible, setSelectedUser, selectedUser } = useContext(AdminContext);
  const [token] = useLocalStorage('auth_token');

  function GetListOfUsers() {
    const { data, error, isLoading } = useQuery<AxiosResponse<User[]> | null, AxiosError>(
      ['users'],
      () => {
        if (!token) return Promise.resolve(null);
        return apiClient.get<User[]>('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
    );

    return { data, error, isLoading };
  }

  function DeleteUser() {
    const {
      mutate: onDelete,
      data: respDeleteUserData,
      isLoading: isLoadingUser,
      error: deleteUserError,
    } = useMutation<User, AxiosError, string>(
      ['deleteUser'],
      (userId: string) =>
        apiClient
          .delete(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => response.data),
      {
        onSuccess: (data) => {
          client.invalidateQueries('users');
          openNotificationWithIcon(
            'success',
            'User Deleted',
            `${data.fullName} was successfully deleted`,
          );
          const newUser: User = {
            id: '',
            fullName: '',
            email: '',
            role: '',
            createdAt: new Date(),
          };
          setSelectedUser(newUser);
          setModelIsVisible(false);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'User Not Deleted', `${error.message}`);
          setModelIsVisible(false);
        },
      },
    );

    return { onDelete, respDeleteUserData, isLoadingUser, deleteUserError };
  }

  function UpdateUser() {
    const {
      mutate: onUpdate,
      data: respUpdateThingData,
      isLoading: isLoadingUpdateThing,
      error: updateThingError,
    } = useMutation<
      User,
      AxiosError,
      {
        userId: string;
        token: string;
        role: string;
      }
    >(
      ['updateThing'],
      ({ role, userId }) =>
        apiClient
          .put(
            `/things/${userId}`,
            { role },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) => response.data),
      {
        onSuccess: (data) => {
          client.invalidateQueries('things');
          openNotificationWithIcon(
            'success',
            'User Role Updated',
            `${data.fullName} was successfully updated`,
          );
          const newUser: User = {
            ...selectedUser,
            role: data.role,
          };
          setSelectedUser(newUser);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'User Not Updated', `${error.message}`);
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

  function RestoreUser() {}

  function ChangeUserRole() {}

  return { GetListOfUsers, DeleteUser, UpdateUser, RestoreUser, ChangeUserRole };
};

export default useUser;
