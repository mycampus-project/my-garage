import { useContext } from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Divider, Alert, Button } from 'antd';
import { AlertType } from '@my-garage/common';
import { AdminContext } from '../../../contexts/AdminContext';

interface BannerProps {
  title: String;
  alertMessage: String;
  alertType: AlertType;
  showAddThing: boolean;
}

// Banner component contains page title and notification bar for success, warning and failure prompts.
function Banner({ title, alertMessage, alertType, showAddThing }: BannerProps) {
  const { setAlertMessage, setAlertType, setModelIsVisible, setModelType } =
    useContext(AdminContext);
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
        extra={
          showAddThing && [
            <Button
              key={1}
              type="primary"
              onClick={() => {
                setModelType('add-device');
                setModelIsVisible(true);
              }}
            >
              Add Device
            </Button>,
            <Button
              key={2}
              type="primary"
              onClick={() => {
                setModelType('restore-device');
                setModelIsVisible(true);
              }}
              style={{ marginRight: '16px' }}
            >
              Restore Device
            </Button>,
          ]
        }
      />
      <Divider />
    </div>
  );
}

export default Banner;
