import { Layout } from 'antd';
import LoginForm from 'src/components/login/LoginForm';
import styled from 'styled-components';

const { Content } = Layout;

const FullHeightLayout = styled(Layout)`
  height: 100vh;
  padding: 32px;
`;

const Header = styled.h1`
  font-size: 48px;
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
`;

function Login() {
  return (
    <FullHeightLayout>
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
