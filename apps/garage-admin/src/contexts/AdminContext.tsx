import { createContext, useState, FC } from 'react';
import { Thing, User } from '@my-garage/common';

interface AdminContextInterface {
  searchValue: string;
  selectedUser: User;
  selectedThing: Thing;
  modelIsVisible: boolean;
  modelType: string;
  image: File | undefined;
  setModelType: (name: string) => void;
  setModelIsVisible: (name: boolean) => void;
  setSelectedUser: (name: User) => void;
  setSelectedThing: (name: Thing) => void;
  setImage: (file: File) => void;
  setSearchValue: (value: string) => void;
}

const defaultContextState: AdminContextInterface = {
  searchValue: '',
  modelType: '',
  image: undefined,
  selectedUser: {
    id: '',
    fullName: '',
    email: '',
    role: '',
    createdAt: new Date(),
  },
  selectedThing: {
    id: '',
    name: '',
    description: '',
    type: '',
    createdAt: new Date(),
    createdBy: { id: '', fullName: '' },
    isAvailable: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  modelIsVisible: false,
  setModelType: () => {},
  setModelIsVisible: () => {},
  setSelectedUser: () => {},
  setSelectedThing: () => {},
  setImage: () => {},
  setSearchValue: () => {},
};

export const AdminContext = createContext<AdminContextInterface>(defaultContextState);

const AdminContextProvider: FC = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User>(defaultContextState.selectedUser);
  const [selectedThing, setSelectedThing] = useState<Thing>(defaultContextState.selectedThing);
  const [modelIsVisible, setModelIsVisible] = useState<boolean>(defaultContextState.modelIsVisible);
  const [modelType, setModelType] = useState<string>(defaultContextState.modelType);
  const [image, setImage] = useState<File | undefined>(defaultContextState.image);
  const [searchValue, setSearchValue] = useState<string>(defaultContextState.searchValue);

  return (
    <AdminContext.Provider
      value={{
        selectedUser,
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
