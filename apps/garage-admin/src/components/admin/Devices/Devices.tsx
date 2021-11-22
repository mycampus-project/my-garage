import { useContext } from 'react';
import { AdminContext } from '../../../contexts/AdminContext';
import PageLayout from '../Common/PageLayout';
import MainContainer from '../Common/MainContainer';
import Banner from '../Common/Banner';
import DeviceInfoPanel from './DeviceInfoPanel';
import ModelLauncher from '../Common/ModelLauncher';
import DeviceList from './DeviceList';

function Devices() {
  const { modelIsVisible } = useContext(AdminContext);

  return (
    <>
      {modelIsVisible && <ModelLauncher />}

      <PageLayout
        Title={<Banner data-testid="banner" title="Devices" showAddThing />}
        Element={<MainContainer list={<DeviceList />} details={<DeviceInfoPanel />} />}
      />
    </>
  );
}

export default Devices;
