import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient, BookingWithUser, useLocalStorage } from '@my-garage/common';

interface PaginationResponse {
  offset: number;
  limit: number;
  total: number;
  items: BookingWithUser[];
}

const useBooking = () => {
  const [token] = useLocalStorage('auth_token');

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

  return { GetThingBookings, GetUserBookings };
};

export default useBooking;
