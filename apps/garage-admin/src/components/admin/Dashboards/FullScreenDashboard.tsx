import { Thing } from '@my-garage/common';
import { Divider, List } from 'antd';
import { FullScreen, FullScreenHandle } from 'react-full-screen';
import styled from 'styled-components';
import FullscreenDashboardItem from './FullScreenDashboardItem';

const StyledFullScreen = styled(FullScreen)`
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
`;

const ListContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 0 60px;
`;

const PageHeader = styled.h1`
  font-size: 60px;
  margin-bottom: 0;
  text-align: center;
`;

interface FullscreenDashboardProps {
  fullscreenHandler: FullScreenHandle;
  selectedList: Thing[];
  show: boolean;
}

const FullscreenDashboard = ({
  fullscreenHandler,
  selectedList,
  show,
}: FullscreenDashboardProps) => (
  <StyledFullScreen handle={fullscreenHandler} className="full-screenable-node">
    <div style={{ width: '100%' }}>
      <PageHeader>Current Booking Congestion</PageHeader>
      <Divider />
    </div>
    {show && (
      <ListContainer>
        <List
          dataSource={selectedList}
          renderItem={(item: Thing) => <FullscreenDashboardItem item={item} />}
        />
      </ListContainer>
    )}
  </StyledFullScreen>
);

export default FullscreenDashboard;
