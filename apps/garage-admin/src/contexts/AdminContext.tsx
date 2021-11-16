import { createContext, useState, FC } from 'react';
import { AlertType, User } from '@my-garage/common';

interface AdminContextInterface {
  alertType: AlertType;
  alertMessage: String;
  selectedUser: User;
  setSelectedUser: (name: User) => void;
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
  setSelectedUser: () => {},
  setAlertType: () => {},
  setAlertMessage: () => {},
};

export const AdminContext = createContext<AdminContextInterface>(defaultContextState);

const AdminContextProvider: FC = ({ children }) => {
  const [alertType, setAlertType] = useState<AlertType>(defaultContextState.alertType);
  const [alertMessage, setAlertMessage] = useState<String>(defaultContextState.alertMessage);
  const [selectedUser, setSelectedUser] = useState<User>(defaultContextState.selectedUser);

  return (
    <AdminContext.Provider
      value={{
        alertType,
        alertMessage,
        selectedUser,
        setSelectedUser,
        setAlertType,
        setAlertMessage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
