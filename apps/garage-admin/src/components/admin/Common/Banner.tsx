import 'antd/dist/antd.css';
import { PageHeader, Divider, Alert } from 'antd';

interface BannerProps {
  Title: String;
  AlertMessage: String;
  AlertType: 'success' | 'info' | 'warning' | 'error' | undefined;
}

function Banner({ Title, AlertMessage, AlertType }: BannerProps) {
  return (
    <>
      <PageHeader title={Title} style={{ fontSize: 45 }} />
      <Divider />
      <Alert message={AlertMessage} type={AlertType} closeText="Close Now" />
    </>
  );
}

export default Banner;
