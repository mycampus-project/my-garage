import { Button, Layout, Menu, Spin } from 'antd';
import { useContext } from 'react';
import { useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminContextProvider from '../contexts/AdminContext';
import { AuthContext } from '../contexts/AuthContext';

const { Content, Sider } = Layout;

const FullHeightLayout = styled(Layout)`
  height: 100vh;
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

function Admin() {
  const navigate = useNavigate();
  const activeMenuKey = useActiveMenuKey();
  const { user, isLoading, setAuthToken } = useContext(AuthContext);

  if (!user && !isLoading) {
    return <Navigate replace to="/login" />;
  }

  if (!activeMenuKey) {
    return <Navigate replace to={{ pathname: '/devices' }} />;
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
    <AdminContextProvider>
      <FullHeightLayout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <SiderContent>
            <Logo src="nokia_white_logos.png" />
            <Menu
              data-testid="NavigationMenu"
              theme="dark"
              mode="inline"
              selectable
              selectedKeys={[activeMenuKey]}
              onSelect={({ key }) => navigate(`/${key}`)}
            >
              <Menu.Item data-testid="nav.devices" key="devices">
                Devices
              </Menu.Item>
              <Menu.Item data-testid="nav.users" key="users">
                Users
              </Menu.Item>
              <Menu.Item data-testid="nav.dashboard" key="dashboards">
                Dashboards
              </Menu.Item>
              <Menu.Item data-testid="nav.dashboard" key="config">
                Configuration
              </Menu.Item>
            </Menu>
            <Spacer />
            <ButtonContainer>
              <Button type="primary" data-testid="nav.logout" onClick={() => setAuthToken('')}>
                Logout
              </Button>
            </ButtonContainer>
          </SiderContent>
        </Sider>

        <Content>
          <Outlet />
        </Content>
      </FullHeightLayout>
    </AdminContextProvider>
  );
}

export default Admin;
