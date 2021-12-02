import { useMutation, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient, BookingWithUser, useLocalStorage } from '@my-garage/common';
import openNotificationWithIcon from 'src/components/admin/Common/OpenNotificationWithIcon';
import { AdminContext } from 'src/contexts/AdminContext';
import { useContext } from 'react';

interface PaginationResponse {
  offset: number;
  limit: number;
  total: number;
  items: BookingWithUser[];
}

const useBooking = () => {
  const client = useQueryClient();
  const [token] = useLocalStorage('auth_token');
  const { setModelIsVisible, setSelectedBookingId } = useContext(AdminContext);

  const GetThingBookingsByDate = (startAt: string, endAt: string) => {
    const {
      mutate: onFetchBookingsByDate,
      data: bookingData,
      isLoading: isLoadingBookings,
      error: bookingsError,
    } = useMutation<
      AxiosResponse<PaginationResponse> | null,
      AxiosError,
      {
        thingId: string;
      }
    >(['thingBookingsByDate'], (thingId) => {
      if (!token) return Promise.resolve(null);
      return apiClient.get<PaginationResponse>('/bookings', {
        params: {
          thingId,
          limit: 0,
          startAt,
          endAt,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
    });

    return { onFetchBookingsByDate, bookingData, isLoadingBookings, bookingsError };
  };

  const GetThingBookings = (offset: number, thingId: string, mode: string) => {
    const {
      mutate: onFetchBookings,
      data: bookingData,
      isLoading: isLoadingBookings,
      error: bookingsError,
    } = useMutation<
      AxiosResponse<PaginationResponse> | null,
      AxiosError,
      {
        offset: number;
        thingId: string;
        mode: string;
      }
    >(['thingBookings', offset], () => {
      if (!token) return Promise.resolve(null);
      return apiClient.get<PaginationResponse>('/bookings', {
        params: {
          thingId,
          limit: 5,
          offset,
          mode,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
    });

    return { onFetchBookings, bookingData, isLoadingBookings, bookingsError };
  };

  const GetUserBookings = (offset: number, userId: string, mode: string) => {
    const {
      mutate: onFetchBookings,
      data: bookingData,
      isLoading: isLoadingBookings,
      error: bookingsError,
    } = useMutation<
      AxiosResponse<PaginationResponse> | null,
      AxiosError,
      {
        offset: number;
        userId: string;
        mode: string;
      }
    >(['userBookings', offset], () => {
      if (!token) return Promise.resolve(null);
      return apiClient.get<PaginationResponse>('/bookings', {
        params: {
          userId,
          limit: 5,
          offset,
          mode,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
    });

    return { onFetchBookings, bookingData, isLoadingBookings, bookingsError };
  };

  function DeleteBooking() {
    const {
      mutate: onDelete,
      data: respDeleteThingData,
      isLoading: isLoadingDeleteBooking,
      error: deleteBookingError,
    } = useMutation<BookingWithUser, AxiosError, string>(
      ['deleteBooking'],
      (bookingId: string) =>
        apiClient
          .delete(`/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => response.data),
      {
        onSuccess: () => {
          client.invalidateQueries('userBookings');
          client.invalidateQueries('thingsBookings');
          client.invalidateQueries('userBookings');
          client.invalidateQueries('thingBookingsByDate');
          openNotificationWithIcon(
            'success',
            'Booking Deleted',
            'Booking was successfully deleted',
          );
          setSelectedBookingId('');
          setModelIsVisible(false);
        },

        onError: (error) => {
          openNotificationWithIcon('error', 'Booking Not Deleted', `${error.message}`);
          setModelIsVisible(false);
        },
      },
    );
    return {
      onDelete,
      respDeleteThingData,
      isLoadingDeleteBooking,
      deleteBookingError,
    };
  }

  return { GetThingBookings, GetUserBookings, GetThingBookingsByDate, DeleteBooking };
};

export default useBooking;
