import { createContext, useState, FC } from 'react';
import { AlertType } from '@my-garage/common';

interface AdminContextInterface {
  alertType: AlertType;
  alertMessage: String;
  updateAlertType: (type: AlertType) => void;
  updateAlertMessage: (name: String) => void;
}

const defaultContextState: AdminContextInterface = {
  alertType: 'success',
  alertMessage: '',
  updateAlertType: () => {},
  updateAlertMessage: () => {},
};

export const AdminContext = createContext<AdminContextInterface>(defaultContextState);

const AdminContextProvider: FC = ({ children }) => {
  const [alertType, setAlertType] = useState<AlertType>(defaultContextState.alertType);
  const [alertMessage, setAlertMessage] = useState<String>(defaultContextState.alertMessage);

  const updateAlertType = (value: AlertType) => {
    setAlertType(value);
  };
  const updateAlertMessage = (value: String) => {
    setAlertMessage(value);
  };

  return (
    <AdminContext.Provider value={{ alertType, alertMessage, updateAlertType, updateAlertMessage }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
