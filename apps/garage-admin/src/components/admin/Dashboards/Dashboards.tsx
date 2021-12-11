import { Thing } from '@my-garage/common';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import useThing from 'src/hooks/useThing';
import useType from 'src/hooks/useType';
import styled from 'styled-components';
import Banner from '../Common/Banner';
import DashboardPicker from './DashboardPicker';
import sortedThingArray from '../../../utilities/utilityFunctions';
import SelectedDeviceList from './SelectedDeviceList';
import FullscreenDashboard from './FullScreenDashboard';
import FullscreenButton from './FullScreenButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .full-screenable-node {
    display: none;
  }

  .fullscreen-enabled {
    display: flex;
    height: 100vh;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const Main = styled.div`
  display: flex;
  height: 90vh;
  justify-content: center;
  align-items: center;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 50%;
  height: 80%;
  border: 1px solid #86868663;
  padding: 32px;
  overflow: auto;
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  height: 10vh;
`;

function Dashboards() {
  const fullscreen = useFullScreenHandle();
  const { data, error, isLoading } = useThing().GetListOfThings();
  const { data: dataTypes } = useType().GetListOfTypes();

  const [filteredThingData, setFilteredThingData] = useState<Thing[]>([]);

  const [selectedList, setSelectedList] = useState<Thing[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    const filteredThings = data
      ? data.data.filter((item: Thing) => item.removedBy === undefined)
      : new Array<Thing>();

    setFilteredThingData(sortedThingArray(filteredThings, 'type'));
  }, [data, dataTypes]);

  useEffect(() => {
    const names = selectedList.map((item: Thing) => item.name);
    setSelectedNames(names);
  }, [selectedList]);

  const handleSelect = (value: string[]) => {
    const array = value.map((item: string) =>
      filteredThingData.filter((thing) => thing.name === item),
    );

    while (array.length >= 6) {
      array.shift();
    }
    setSelectedList(array.flat());
  };

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Container>
      <Top>
        <Banner title="Dashboard" />
      </Top>
      <Main>
        <CenterContainer>
          <DashboardPicker
            data={filteredThingData}
            onSelect={handleSelect}
            defaultData={selectedNames}
          />

          <SelectedDeviceList selectedList={selectedList} />
          <FullscreenButton
            onFullscreen={() => {
              fullscreen.enter();
            }}
          />
        </CenterContainer>
      </Main>

      <FullscreenDashboard
        selectedList={selectedList}
        fullscreenHandler={fullscreen}
        show={fullscreen.active}
      />
    </Container>
  );
}

export default Dashboards;
