import { createContext, useState, FC } from 'react';
import { Thing, Type, User } from '@my-garage/common';

interface AdminContextInterface {
  typeFilter: string[];
  selectedBookingId: string;
  searchValue: string;
  selectedUser: User | null;
  selectedThing: Thing | null;
  selectedType: Type | null;
  modelIsVisible: boolean;
  modelType: string;
  image: File | undefined;
  setModelType: (name: string) => void;
  setModelIsVisible: (name: boolean) => void;
  setSelectedUser: (name: User | null) => void;
  setSelectedThing: (name: Thing | null) => void;
  setSelectedType: (name: Type | null) => void;
  setImage: (file: File) => void;
  setSearchValue: (value: string) => void;
  setSelectedBookingId: (id: string) => void;
  setTypeFilter: (array: string[]) => void;
}

const defaultContextState: AdminContextInterface = {
  typeFilter: [],
  selectedBookingId: '',
  searchValue: '',
  modelType: '',
  image: undefined,
  selectedUser: null,
  selectedThing: null,
  selectedType: null,
  modelIsVisible: false,
  setModelType: () => {},
  setSelectedType: () => {},
  setModelIsVisible: () => {},
  setSelectedUser: () => {},
  setSelectedThing: () => {},
  setImage: () => {},
  setSearchValue: () => {},
  setSelectedBookingId: () => {},
  setTypeFilter: () => {},
};

export const AdminContext = createContext<AdminContextInterface>(defaultContextState);

const AdminContextProvider: FC = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(defaultContextState.selectedUser);
  const [selectedThing, setSelectedThing] = useState<Thing | null>(
    defaultContextState.selectedThing,
  );
  const [modelIsVisible, setModelIsVisible] = useState<boolean>(defaultContextState.modelIsVisible);
  const [modelType, setModelType] = useState<string>(defaultContextState.modelType);
  const [image, setImage] = useState<File | undefined>(defaultContextState.image);
  const [searchValue, setSearchValue] = useState<string>(defaultContextState.searchValue);
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    defaultContextState.selectedBookingId,
  );
  const [typeFilter, setTypeFilter] = useState<string[]>(defaultContextState.typeFilter);
  const [selectedType, setSelectedType] = useState<Type | null>(defaultContextState.selectedType);

  return (
    <AdminContext.Provider
      value={{
        selectedType,
        setSelectedType,
        typeFilter,
        setTypeFilter,
        selectedUser,
        selectedBookingId,
        setSelectedBookingId,
        modelIsVisible,
        modelType,
        setModelType,
        setModelIsVisible,
        setSelectedUser,
        selectedThing,
        setSelectedThing,
        image,
        setImage,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
