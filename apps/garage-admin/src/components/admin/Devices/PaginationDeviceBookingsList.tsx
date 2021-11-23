import 'antd/dist/antd.css';
import { List, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BookingData } from '../../../types/adminTypes';
import DeviceBookingItem from './DeviceBookingItem';

interface DataProps {
  data: BookingData[];
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

const PaginationDeviceList = ({ data }: DataProps) => {
  const [filteredData, setFilteredData] = useState<BookingData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(0);
  const pageSize: number = 5;

  useEffect(() => {
    setFilteredData(data);
    setMinIndex(0);
    setMaxIndex(pageSize);
    setCurrentPage(1);
  }, [data]);

  const handleOnChange = (page: number) => {
    setCurrentPage(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  return (
    <StyledDiv>
      <List
        data-testid="deviceList"
        style={{ width: '100%' }}
        dataSource={filteredData.filter((_, index) => index >= minIndex && index < maxIndex)}
        renderItem={(item) => <DeviceBookingItem item={item} />}
      />
      <StyledPagination
        pageSize={pageSize}
        current={currentPage}
        total={filteredData.length}
        onChange={handleOnChange}
      />
    </StyledDiv>
  );
};

export default PaginationDeviceList;
