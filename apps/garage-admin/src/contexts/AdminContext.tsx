import { createContext, useState, FC } from 'react';
import { AlertType, Thing, User } from '@my-garage/common';

interface AdminContextInterface {
  alertType: AlertType;
  alertMessage: String;
  selectedUser: User;
  selectedThing: Thing;
  setSelectedUser: (name: User) => void;
  setSelectedThing: (name: Thing) => void;
  setAlertType: (type: AlertType) => void;
  setAlertMessage: (name: String) => void;
}

const defaultContextState: AdminContextInterface = {
  alertType: 'success',
  alertMessage: '',
  selectedUser: {
    id: '',
    fullName: '',
    email: '',
    role: '',
    createdAt: new Date(),
  },
  selectedThing: {
    name: '',
    description: '',
    type: '',
    createdAt: new Date(),
    createdBy: '',
    isAvailable: true,
  },
  setSelectedUser: () => {},
  setSelectedThing: () => {},
  setAlertType: () => {},
  setAlertMessage: () => {},
};

export const AdminContext = createContext<AdminContextInterface>(defaultContextState);

const AdminContextProvider: FC = ({ children }) => {
  const [alertType, setAlertType] = useState<AlertType>(defaultContextState.alertType);
  const [alertMessage, setAlertMessage] = useState<String>(defaultContextState.alertMessage);
  const [selectedUser, setSelectedUser] = useState<User>(defaultContextState.selectedUser);
  const [selectedThing, setSelectedThing] = useState<Thing>(defaultContextState.selectedThing);

  return (
    <AdminContext.Provider
      value={{
        alertType,
        alertMessage,
        selectedUser,
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
