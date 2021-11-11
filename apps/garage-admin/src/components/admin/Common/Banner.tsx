import { useContext } from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Divider, Alert } from 'antd';
import { AlertType } from '@my-garage/common';
import styled from 'styled-components';
import { AdminContext } from './AdminContext';

interface BannerProps {
  title: String;
  alertMessage: String;
  alertType: AlertType;
}

const Title = styled.h1`
  font-size: 36px;
`;

// Banner component contains page title and notification bar for success, warning and failure prompts.
function Banner({ title, alertMessage, alertType }: BannerProps) {
  const { setAlertMessage, setAlertType } = useContext(AdminContext);
  return (
    <>
      <PageHeader
        title={<Title>{title}</Title>}
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
    </>
  );
}

export default Banner;
