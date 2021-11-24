import { Form, Button, Input } from 'antd';
import useType from 'src/hooks/useType';

const AddTypeForm = () => {
  const { onSubmit } = useType().AddType();

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
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
    </Form>
  );
};

export default AddTypeForm;
