import { Thing } from '@my-garage/common';
import { Avatar, Divider, List } from 'antd';
import { FullScreen, FullScreenHandle } from 'react-full-screen';
import styled from 'styled-components';

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

const StyledListItem = styled(List.Item)`
  background-color: #fcf8f8;
  border-radius: 10px;
  padding: 16px;
  margin: 32px;
`;

const Title = styled.h1`
  display: flex;
  flex-grow: 1;
  font-size: 60px;
`;

const PageHeader = styled.h1`
  font-size: 60px;
  margin-bottom: 0;
  text-align: center;
`;

interface FullscreenDashboardProps {
  fullscreenHandler: FullScreenHandle;
  selectedList: Thing[];
}

const FullscreenDashboard = ({ fullscreenHandler, selectedList }: FullscreenDashboardProps) => (
  <StyledFullScreen handle={fullscreenHandler} className="full-screenable-node">
    <div style={{ width: '100%' }}>
      <PageHeader>Current Booking Congestion</PageHeader>
      <Divider />
    </div>
    <ListContainer>
      <List
        dataSource={selectedList}
        renderItem={(item: Thing) => (
          <StyledListItem>
            <List.Item.Meta
              avatar={<Avatar size={{ lg: 100, xl: 150, xxl: 150 }} src="amber.jpg" />}
            />
            <Title>{item.name}</Title>
          </StyledListItem>
        )}
      />
    </ListContainer>
  </StyledFullScreen>
);

export default FullscreenDashboard;
