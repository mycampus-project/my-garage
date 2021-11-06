import { Layout, Menu } from 'antd';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
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

function Admin() {
  const navigate = useNavigate();
  const activeMenuKey = useActiveMenuKey();

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
          <Menu.Item key="devices">Devices</Menu.Item>
          <Menu.Item key="users">Users</Menu.Item>
          <Menu.Item key="dashboards">Dashboards</Menu.Item>
        </Menu>
      </Sider>

      <Content>
        <Outlet />
      </Content>
    </FullHeightLayout>
  );
}

export default Admin;
