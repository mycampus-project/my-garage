import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import PageLayout from '../Common/PageLayout';
import Banner from '../Common/Banner';

import ModelLauncher from '../Common/ModelLauncher';
import ConfigurationContainer from './ConfigurationContainer';

// Entry point to the users webpage.
function Configuration() {
  const { modelIsVisible } = useContext(AdminContext);

  return (
    <>
      {modelIsVisible && <ModelLauncher />}
      <PageLayout
        Title={<Banner data-testid="banner" title="Configuration" />}
        Element={<ConfigurationContainer />}
      />
    </>
  );
}

export default Configuration;
