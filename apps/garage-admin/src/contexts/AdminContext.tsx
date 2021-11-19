import { createContext, useState, FC } from 'react';
import { Thing, User } from '@my-garage/common';

interface AdminContextInterface {
  selectedUser: User;
  selectedThing: Thing;
  modelIsVisible: boolean;
  modelType: string;
  setModelType: (name: string) => void;
  setModelIsVisible: (name: boolean) => void;
  setSelectedUser: (name: User) => void;
  setSelectedThing: (name: Thing) => void;
}

const defaultContextState: AdminContextInterface = {
  modelType: '',
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
  },
  modelIsVisible: false,
  setModelType: () => {},
  setModelIsVisible: () => {},
  setSelectedUser: () => {},
  setSelectedThing: () => {},
};

export const AdminContext = createContext<AdminContextInterface>(defaultContextState);

const AdminContextProvider: FC = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User>(defaultContextState.selectedUser);
  const [selectedThing, setSelectedThing] = useState<Thing>(defaultContextState.selectedThing);
  const [modelIsVisible, setModelIsVisible] = useState<boolean>(defaultContextState.modelIsVisible);
  const [modelType, setModelType] = useState<string>(defaultContextState.modelType);

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
