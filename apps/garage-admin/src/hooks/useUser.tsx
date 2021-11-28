import { apiClient, useLocalStorage, User } from '@my-garage/common';
import { AxiosError, AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import openNotificationWithIcon from 'src/components/admin/Common/OpenNotificationWithIcon';
import { AdminContext } from 'src/contexts/AdminContext';

const useUser = () => {
  const client = useQueryClient();
  const { setSelectedUser, selectedUser } = useContext(AdminContext);
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
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'User Not Deleted', `${error.message}`);
        },
      },
    );

    return { onDelete, respDeleteUserData, isLoadingUser, deleteUserError };
  }

  function ChangeUserRole() {
    const {
      mutate: onUpdateRole,
      data: respUpdateUserRoleData,
      isLoading: isLoadingUpdateUserRole,
      error: updateUserRoleError,
    } = useMutation<
      User,
      AxiosError,
      {
        userId: string;
        token: string;
        role: string;
      }
    >(
      ['updateUser'],
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
          client.invalidateQueries('users');
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
      onUpdateRole,
      respUpdateUserRoleData,
      isLoadingUpdateUserRole,
      updateUserRoleError,
    };
  }

  function RestoreUser() {
    const {
      mutate: onRestoreUser,
      data: respRestoreUserData,
      isLoading: isLoadingRestoreUser,
      error: restoreUserError,
    } = useMutation<User, AxiosError, string>(
      ['restoreUser'],
      (thingId: string) =>
        apiClient
          .put(
            `/users/${thingId}/restore`,
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
            `${data.fullName} was successfully restored`,
          );
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Device Not Restored', `${error.message}`);
        },
      },
    );
    return {
      onRestoreUser,
      respRestoreUserData,
      isLoadingRestoreUser,
      restoreUserError,
    };
  }

  return { GetListOfUsers, DeleteUser, RestoreUser, ChangeUserRole };
};

export default useUser;
