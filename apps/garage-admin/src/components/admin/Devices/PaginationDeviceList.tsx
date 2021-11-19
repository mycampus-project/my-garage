import 'antd/dist/antd.css';
import { List, Pagination } from 'antd';
import useThing from 'src/hooks/useThing';
import { useLocalStorage, Thing } from '@my-garage/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeviceListItem from './DeviceListItem';

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const PaginationDeviceList = () => {
  const [token] = useLocalStorage('auth_token');
  const { data, error, isLoading } = useThing().GetListOfThings(token);
  const [filteredData, setFilteredData] = useState<Thing[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(0);
  // const [totalPages, setTotalPages] = useState<number>(0);
  const pageSize: number = 9;

  const sortedByNameAlphabetically = (dataArray: Thing[]) => {
    function compareByName(a: Thing, b: Thing) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    return dataArray.sort(compareByName);
  };

  useEffect(() => {
    const sortedData = data ? sortedByNameAlphabetically(data.data) : new Array<Thing>();
    const filteredArray = sortedData.filter((item: Thing) => item.removedBy === undefined);
    setFilteredData(filteredArray);
    // setTotalPages(filteredArray.length / pageSize);
    setMinIndex(0);
    setMaxIndex(pageSize);
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  const handleOnChange = (page: number) => {
    setCurrentPage(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  return (
    <StyledDiv>
      <List
        data-testid="deviceList"
        loading={isLoading}
        style={{ width: '100%' }}
        dataSource={filteredData.filter((_, index) => index >= minIndex && index < maxIndex)}
        renderItem={(item) => <DeviceListItem item={item} />}
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
