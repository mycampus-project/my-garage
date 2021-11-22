import { Layout } from 'antd';
import LoginForm from 'src/components/login/LoginForm';
import styled from 'styled-components';

const { Content } = Layout;

const FullHeightLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: white;
  background-image: url('loginBackground.png');
  background-attachment: local;
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
`;

const Header = styled.h1`
  font-size: 48px;
  margin: 32px;
`;

const WidthContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const CenteredContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  z-index: 2;
`;

const BlueBar = styled.div`
  position: relative;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: var(--ant-primary-7);
`;

function Login() {
  return (
    <FullHeightLayout>
      <BlueBar />
      <Content>
        <WidthContainer>
          <Header>Nokia Garage</Header>
          <CenteredContent>
            <LoginForm />
          </CenteredContent>
        </WidthContainer>
      </Content>
    </FullHeightLayout>
  );
}

export default Login;
