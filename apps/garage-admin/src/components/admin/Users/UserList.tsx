import { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import useUser from 'src/hooks/useUser';
import { User } from '@my-garage/common';
import { AdminContext } from 'src/contexts/AdminContext';
import { groupBy } from 'lodash';
import { UserSorted } from 'src/types/adminTypes';
import UserListSection from './UserListSection';

const searchList = (searchValue: string, array: User[]) => {
  const searchResult = array.filter((item) => {
    if (
      item.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.role.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return item;
    }
    return false;
  });

  return searchResult;
};

const UserList = () => {
  const { searchValue } = useContext(AdminContext);
  const { data, error, isLoading } = useUser().GetListOfUsers();
  const [filteredData, setFilteredData] = useState<UserSorted[]>([]);
  const groupedItems =
    filteredData && Object.entries(groupBy(filteredData, (user) => user.surname));

  useEffect(() => {
    const filteredArray: UserSorted[] = data
      ? data.data.filter((item: UserSorted) => item.removedBy === undefined)
      : new Array<UserSorted>();

    const newArray = filteredArray.map((user) => {
      const letter = user.fullName.split(' ').map((surname) => surname[0]);
      return {
        ...user,
        surname: letter[1],
      };
    });

    if (searchValue === '') {
      setFilteredData(newArray);
    }
    if (searchValue !== '') {
      setFilteredData(searchList(searchValue, newArray));
    }
  }, [data, searchValue]);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      {groupedItems?.map(([type, itemsOfType]) => (
        <UserListSection key={type} items={itemsOfType} type={type} />
      ))}
    </>
  );
};

export default UserList;
