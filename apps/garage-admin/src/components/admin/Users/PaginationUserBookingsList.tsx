import 'antd/dist/antd.css';
import { List, Pagination, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BookingWithUser } from '@my-garage/common';
import { PaginationResponse } from 'src/types/adminTypes';
import useBooking from 'src/hooks/useBooking';
import { AdminContext } from 'src/contexts/AdminContext';
import UserBookingItem from './UserBookingItem';

interface DataProps {
  mode: string;
  userId: string;
}

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PaginationUserBookingList = ({ mode, userId }: DataProps) => {
  const pageSize: number = 5;
  const { selectedBookingId } = useContext(AdminContext);
  const [filteredData, setFilteredData] = useState<BookingWithUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  const { onFetchBookings, bookingData, isLoadingBookings, bookingsError } =
    useBooking().GetUserBookings(offset, userId, mode);

  useEffect(() => {
    const bookings: PaginationResponse | null = bookingData ? bookingData.data : null;
    if (bookings !== null) {
      setFilteredData(bookings.items);
      setTotalPages(bookings.total);
    }

    setMinIndex(0);
    setMaxIndex(pageSize);
  }, [bookingData, offset, onFetchBookings, userId]);

  useEffect(() => {
    onFetchBookings({ offset, userId, mode });
  }, [mode, offset, onFetchBookings, userId, selectedBookingId]);

  const handleOnChange = (page: number) => {
    setOffset((page - 1) * pageSize);
    setCurrentPage(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  if (bookingsError) {
    return <div>Error</div>;
  }

  if (isLoadingBookings) {
    return <Spin />;
  }

  return (
    <StyledDiv>
      <List
        data-testid="deviceList"
        style={{ width: '100%' }}
        dataSource={filteredData.filter((_, index) => index >= minIndex && index < maxIndex)}
        renderItem={(item) => <UserBookingItem item={item} mode={mode} />}
      />
      <StyledPagination
        pageSize={pageSize}
        current={currentPage}
        total={totalPages}
        onChange={handleOnChange}
      />
    </StyledDiv>
  );
};

export default PaginationUserBookingList;
