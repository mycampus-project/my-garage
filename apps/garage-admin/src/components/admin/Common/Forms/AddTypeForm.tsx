import { Form, Button, Input, Spin } from 'antd';
import useType from 'src/hooks/useType';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin-top: 36px;
`;

const AddTypeForm = () => {
  const { onSubmit, isLoadingAddThing } = useType().AddType();

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Spin spinning={isLoadingAddThing}>
      <StyledForm
        name="Add Type"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item label="New Type" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </StyledForm>
    </Spin>
  );
};

export default AddTypeForm;
