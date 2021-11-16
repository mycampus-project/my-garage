import { useContext } from 'react';
import { AdminContext } from '../../../contexts/AdminContext';
import PageLayout from '../Common/PageLayout';
import MainContainer from '../Common/MainContainer';
import Banner from '../Common/Banner';
import DeviceList from './DeviceList';
import DeviceInfoPanel from './DeviceInfoPanel';

function Devices() {
  const { alertType, alertMessage } = useContext(AdminContext);

  const banner = (
    <Banner
      data-testid="banner"
      title="Devices"
      alertMessage={alertMessage}
      alertType={alertType}
    />
  );

  const userMainContainer = <MainContainer list={<DeviceList />} details={<DeviceInfoPanel />} />;
  return <PageLayout Title={banner} Element={userMainContainer} />;
}

export default Devices;
