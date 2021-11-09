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

function Banner({ title, alertMessage, alertType }: BannerProps) {
  const { updateAlertMessage } = useContext(AdminContext);
  return (
    <>
      <PageHeader
        title={<Title>{title}</Title>}
        style={{}}
        footer={
          alertMessage.length > 0 && (
            <>
              <Alert
                message={alertMessage}
                type={alertType}
                closable
                afterClose={() => {
                  updateAlertMessage('Test');
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
