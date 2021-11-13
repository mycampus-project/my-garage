import { Layout, Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

const FullHeightLayout = styled(Layout)`
  height: 100vh;
  padding: 32px;
`;

const Header = styled.h1`
  font-size: 48px;
`;

const CenteredContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  width: 400px;
  min-width: 0;
`;

function Login() {
  return (
    <FullHeightLayout>
      <Content>
        <Header>Nokia Garage</Header>
        <CenteredContent>
          <LoginForm>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={console.log}
              onFinishFailed={console.log}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ xs: { offset: 0, span: 12 }, sm: { offset: 8, span: 16 } }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ xs: { offset: 0, span: 12 }, sm: { offset: 8, span: 16 } }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </LoginForm>
        </CenteredContent>
      </Content>
    </FullHeightLayout>
  );
}

export default Login;
