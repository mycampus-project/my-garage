import { createContext, useState, FC } from 'react';
import { AlertType, Thing, User } from '@my-garage/common';

interface AdminContextInterface {
  alertType: AlertType;
  alertMessage: string;
  selectedUser: User;
  selectedThing: Thing;
  modelIsVisible: boolean;
  modelType: string;
  setModelType: (name: string) => void;
  setModelIsVisible: (name: boolean) => void;
  setSelectedUser: (name: User) => void;
  setSelectedThing: (name: Thing) => void;
  setAlertType: (type: AlertType) => void;
  setAlertMessage: (name: string) => void;
}

const defaultContextState: AdminContextInterface = {
  alertType: 'success',
  alertMessage: '',
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
  setAlertType: () => {},
  setAlertMessage: () => {},
};

export const AdminContext = createContext<AdminContextInterface>(defaultContextState);

const AdminContextProvider: FC = ({ children }) => {
  const [alertType, setAlertType] = useState<AlertType>(defaultContextState.alertType);
  const [alertMessage, setAlertMessage] = useState<string>(defaultContextState.alertMessage);
  const [selectedUser, setSelectedUser] = useState<User>(defaultContextState.selectedUser);
  const [selectedThing, setSelectedThing] = useState<Thing>(defaultContextState.selectedThing);
  const [modelIsVisible, setModelIsVisible] = useState<boolean>(defaultContextState.modelIsVisible);
  const [modelType, setModelType] = useState<string>(defaultContextState.modelType);

  return (
    <AdminContext.Provider
      value={{
        alertType,
        alertMessage,
        selectedUser,
        modelIsVisible,
        modelType,
        setModelType,
        setModelIsVisible,
        setSelectedUser,
        setAlertType,
        setAlertMessage,
        selectedThing,
        setSelectedThing,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
