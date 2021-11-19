import { useContext } from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Divider, Button } from 'antd';
import { AdminContext } from '../../../contexts/AdminContext';

interface BannerProps {
  title: String;
  showAddThing: boolean;
}

// Banner component contains page title and notification bar for success, warning and failure prompts.
function Banner({ title, showAddThing }: BannerProps) {
  const { setModelIsVisible, setModelType } = useContext(AdminContext);
  return (
    <div data-testid="banner">
      <PageHeader
        title={title}
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
