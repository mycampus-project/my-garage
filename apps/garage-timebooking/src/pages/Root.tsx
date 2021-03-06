import { Button, Layout, Menu, Spin } from 'antd';
import { useContext } from 'react';
import { Navigate } from 'react-router';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';
import styled from 'styled-components';

const { Content, Sider } = Layout;

const FullHeightLayout = styled(Layout)`
  min-height: 100vh;
`;

const SpinnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  padding-left: 24px;
  padding-bottom: 16px;
`;

const SiderContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Logo = styled.img`
  height: auto;
  width: 100%;
`;

const useActiveMenuKey = () => {
  const { pathname } = useLocation();

  return pathname.substring(1);
};

function Root() {
  const navigate = useNavigate();
  const activeMenuKey = useActiveMenuKey();
  const { user, isLoading, setAuthToken } = useContext(AuthContext);

  if (!user && !isLoading) {
    return <Navigate replace to="/login" />;
  }

  if (!activeMenuKey) {
    return <Navigate replace to={{ pathname: '/new' }} />;
  }

  if (isLoading) {
    return (
      <FullHeightLayout>
        <SpinnerContainer>
          <Spin size="large" />
        </SpinnerContainer>
      </FullHeightLayout>
    );
  }

  return (
    <FullHeightLayout>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ backgroundColor: '#124191' }}>
        <SiderContent>
          <Logo src="nokia_white_logos.png" />
          <Menu
            data-testid="NavigationMenu"
            mode="inline"
            selectable
            theme="dark"
            style={{ backgroundColor: '#124191' }}
            selectedKeys={[activeMenuKey]}
            onSelect={({ key }) => navigate(`/${key}`)}
          >
            <Menu.Item data-testid="newBooking" key="new">
              New booking
            </Menu.Item>
            <Menu.Item key="bookings">My bookings</Menu.Item>
            <Menu.Item key="history">History</Menu.Item>
          </Menu>
          <Spacer />
          <ButtonContainer>
            <Button type="primary" onClick={() => setAuthToken('')}>
              Logout
            </Button>
          </ButtonContainer>
        </SiderContent>
      </Sider>

      <Content>
        <Outlet />
      </Content>
    </FullHeightLayout>
  );
}

export default Root;
