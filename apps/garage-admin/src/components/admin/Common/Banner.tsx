import { useContext } from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Divider, Alert } from 'antd';
import { AlertType } from '@my-garage/common';
import { AdminContext } from '../../../contexts/AdminContext';

interface BannerProps {
  title: String;
  alertMessage: String;
  alertType: AlertType;
}

// Banner component contains page title and notification bar for success, warning and failure prompts.
function Banner({ title, alertMessage, alertType }: BannerProps) {
  const { setAlertMessage, setAlertType } = useContext(AdminContext);
  return (
    <div data-testid="banner">
      <PageHeader
        title={title}
        footer={
          alertMessage.length > 0 && (
            <>
              <Alert
                message={alertMessage}
                type={alertType}
                closable
                afterClose={() => {
                  setAlertMessage('');
                  setAlertType('success');
                }}
              />
            </>
          )
        }
      />
      <Divider />
    </div>
  );
}

export default Banner;
