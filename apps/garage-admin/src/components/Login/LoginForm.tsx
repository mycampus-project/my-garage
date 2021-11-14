import { Form, Input, Button, Alert, Row, Col } from 'antd';
import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from 'src/contexts/AuthContext';
import styled from 'styled-components';
import useLogin from './useLogin';

const Container = styled.div`
  width: 400px;
  min-width: 0;
`;

const LoginForm = () => {
  const { onSubmit, isLoading, error } = useLogin();
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Form<{ email: string; password: string }>
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              pattern: /^[A-Za-z0-9._%+-]+@nokia.com$/,
              message: 'Email invalid. Only @nokia.com emails allowed',
            },
          ]}
        >
          <Input type="email" disabled={isLoading} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={isLoading} />
        </Form.Item>

        <Form.Item wrapperCol={{ xs: { offset: 0, span: 12 }, sm: { offset: 8, span: 16 } }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>

        {error && (
          <Row>
            <Col xs={{ offset: 0, span: 12 }} sm={{ offset: 8, span: 16 }}>
              <Alert message={error} type="error" />
            </Col>
          </Row>
        )}
      </Form>
    </Container>
  );
};

export default LoginForm;
