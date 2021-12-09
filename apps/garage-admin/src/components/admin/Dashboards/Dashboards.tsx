import { Thing } from '@my-garage/common';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import useThing from 'src/hooks/useThing';
import useType from 'src/hooks/useType';
import styled from 'styled-components';
import Banner from '../Common/Banner';
import DashboardPicker from './DashboardPicker';
import { sortedThingArray } from '../../../utilities/utilityFunctions';
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
  // const [typeData, setTypeData] = useState<Type[]>([]);
  const [selectedList, setSelectedList] = useState<Thing[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  // const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const filteredThings = data
      ? data.data.filter((item: Thing) => item.removedBy === undefined)
      : new Array<Thing>();

    // const filteredTypes = dataTypes
    //   ? dataTypes.data.filter((item: Type) => item.removedBy === undefined)
    //   : new Array<Type>();

    setFilteredThingData(sortedThingArray(filteredThings, 'type'));
    // setTypeData(filteredTypes);
  }, [data, dataTypes]);

  useEffect(() => {
    const names = selectedList.map((item: Thing) => item.name);
    setSelectedNames(names);
  }, [selectedList]);

  // const handleClear = () => {
  //   setSelectedNames([]);
  //   setSelectedList([]);
  // };

  const handleSelect = (value: string[]) => {
    const array = value.map((item: string) =>
      filteredThingData.filter((thing) => thing.name === item),
    );

    while (array.length >= 6) {
      array.shift();
    }
    setSelectedList(array.flat());
  };

  // const handlePresetSelect = (value: string) => {
  //   const array = filteredThingData.filter((thing) => thing.type === value);

  //   while (array.length >= 6) {
  //     array.shift();
  //   }

  //   setSelectedList(array);
  // };

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
          {/* <PresetButtons
            types={typeData}
            onClear={handleClear}
            onPresetSelect={handlePresetSelect}
          /> */}
          <SelectedDeviceList selectedList={selectedList} />
          <FullscreenButton
            onFullscreen={() => {
              fullscreen.enter();
              //  setShow(true);
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
