import { Layout } from 'antd';
import LoginForm from 'src/components/Login/LoginForm';
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

  @media only screen and (max-width: 400px) {
    overflow: hidden;
  }
`;

const Header = styled.h1`
  font-size: 48px;
  margin: 32px;

  @media only screen and (max-width: 480px) {
    margin: 8px;
  }
`;

const WidthContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 480px) {
    max-width: 300px;
  }
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
  background-color: #124191;

  @media only screen and (max-width: 650px) {
    position: absolute;
    max-width: 20px;
  }

  @media only screen and (max-width: 350px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: auto;
  width: 100%;

  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

function Login() {
  return (
    <FullHeightLayout>
      <BlueBar>
        <Logo src="nokia_white_logos.png" />
      </BlueBar>
      <Content>
        <WidthContainer>
          <Header>The Garage</Header>
          <CenteredContent>
            <LoginForm />
          </CenteredContent>
        </WidthContainer>
      </Content>
    </FullHeightLayout>
  );
}

export default Login;
