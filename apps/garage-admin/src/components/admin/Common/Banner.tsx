import { useContext } from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Divider, Button } from 'antd';

import { AdminContext } from '../../../contexts/AdminContext';

interface BannerProps {
  title: String;
  showAddThing?: boolean;
  showRestoreUser?: boolean;
}

const defaultProps = {
  showAddThing: false,
  showRestoreUser: false,
};

// Banner component contains page title and notification bar for success, warning and failure prompts.
function Banner({ title, showAddThing, showRestoreUser }: BannerProps) {
  const { setModelIsVisible, setModelType } = useContext(AdminContext);

  const showAddThings = [
    <Button
      key={1}
      type="primary"
      onClick={() => {
        setModelType('manage-type');
        setModelIsVisible(true);
      }}
    >
      Add Type
    </Button>,
    <Button
      key={2}
      type="primary"
      onClick={() => {
        setModelType('add-device');
        setModelIsVisible(true);
      }}
    >
      Add Device
    </Button>,
    <Button
      key={3}
      type="primary"
      onClick={() => {
        setModelType('restore-device');
        setModelIsVisible(true);
      }}
      style={{ marginRight: '16px' }}
    >
      Restore Device
    </Button>,
  ];

  const showRestoreUsers = [
    <Button
      key={1}
      type="primary"
      onClick={() => {
        setModelType('restore-user');
        setModelIsVisible(true);
      }}
      style={{ marginRight: '16px' }}
    >
      Restore User
    </Button>,
  ];

  return (
    <div data-testid="banner" style={{ width: '100%' }}>
      <PageHeader
        title={title}
        extra={(showAddThing && showAddThings) || (showRestoreUser && showRestoreUsers) || []}
      />
      <Divider />
    </div>
  );
}

Banner.defaultProps = defaultProps;

export default Banner;
