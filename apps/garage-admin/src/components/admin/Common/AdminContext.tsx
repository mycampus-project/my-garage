import { createContext, useState, FC } from 'react';
import { AlertType, User } from '@my-garage/common';

interface AdminContextInterface {
  alertType: AlertType;
  alertMessage: String;
  userSelected: User;
  setUserSelected: (name: User) => void;
  setAlertType: (type: AlertType) => void;
  setAlertMessage: (name: String) => void;
}

const defaultContextState: AdminContextInterface = {
  alertType: 'success',
  alertMessage: '',
  userSelected: {
    id: '',
    fullName: '',
    email: '',
    role: '',
    createdAt: new Date(),
  },
  setUserSelected: () => {},
  setAlertType: () => {},
  setAlertMessage: () => {},
};

export const AdminContext = createContext<AdminContextInterface>(defaultContextState);

const AdminContextProvider: FC = ({ children }) => {
  const [alertType, setAlertType] = useState<AlertType>(defaultContextState.alertType);
  const [alertMessage, setAlertMessage] = useState<String>(defaultContextState.alertMessage);
  const [userSelected, setUserSelected] = useState<User>(defaultContextState.userSelected);

  return (
    <AdminContext.Provider
      value={{
        alertType,
        alertMessage,
        userSelected,
        setUserSelected,
        setAlertType,
        setAlertMessage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
