import { Layout, Menu } from 'antd';
import { useContext } from 'react';
import { Navigate } from 'react-router';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';
import styled from 'styled-components';

const { Content, Sider } = Layout;

const FullHeightLayout = styled(Layout)`
  height: 100vh;
`;

// TODO: Create logo
const Logo = styled.div``;

const useActiveMenuKey = () => {
  const { pathname } = useLocation();

  return pathname.substring(1);
};

function Root() {
  const navigate = useNavigate();
  const activeMenuKey = useActiveMenuKey();
  const { user, isLoading } = useContext(AuthContext);

  if (!user && !isLoading) {
    return <Navigate replace to="/login" />;
  }

  return (
    <FullHeightLayout>
      <Sider breakpoint="lg" collapsedWidth="0" theme="light">
        <Logo />
        <Menu
          data-testid="NavigationMenu"
          theme="light"
          mode="inline"
          selectable
          selectedKeys={[activeMenuKey]}
          onSelect={({ key }) => navigate(`/${key}`)}
        >
          <Menu.Item key="new">New booking</Menu.Item>
          <Menu.Item key="current">Current bookings</Menu.Item>
          <Menu.Item key="history">History</Menu.Item>
        </Menu>
      </Sider>

      <Content>
        <Outlet />
      </Content>
    </FullHeightLayout>
  );
}

export default Root;
