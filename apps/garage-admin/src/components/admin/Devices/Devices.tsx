import { useContext } from 'react';
import { AdminContext } from '../../../contexts/AdminContext';
import PageLayout from '../Common/PageLayout';
import MainContainer from '../Common/MainContainer';
import Banner from '../Common/Banner';
import DeviceList from './DeviceList';
import DeviceInfoPanel from './DeviceInfoPanel';
import AddDeviceModel from './AddDeviceModel';

function Devices() {
  const { alertType, alertMessage, addDeviceIsVisible } = useContext(AdminContext);

  return (
    <>
      {addDeviceIsVisible && <AddDeviceModel />}

      <PageLayout
        Title={
          <Banner
            data-testid="banner"
            title="Devices"
            alertMessage={alertMessage}
            alertType={alertType}
            showAddThing
          />
        }
        Element={<MainContainer list={<DeviceList />} details={<DeviceInfoPanel />} />}
      />
    </>
  );
}

export default Devices;
