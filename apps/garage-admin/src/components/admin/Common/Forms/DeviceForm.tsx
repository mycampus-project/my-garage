import { Type } from '@my-garage/common';
import { Form, Input, Switch, Select, Button, Spin } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import useThing from 'src/hooks/useThing';
import useType from 'src/hooks/useType';
import { AddDeviceFormProps } from 'src/types/adminTypes';

import openNotificationWithIcon from '../OpenNotificationWithIcon';
import UploadAvatar from '../UploadAvatar';

const { Option } = Select;
const { TextArea } = Input;

const defaultProps = {
  showEdit: false,
};

const DeviceForm = ({ form, showEdit }: AddDeviceFormProps) => {
  const { image, selectedThing } = useContext(AdminContext);
  const { data } = useType().GetListOfTypes();
  const { onSubmit, isLoadingAddThing } = useThing().AddThing();
  const { onUpdate, isLoadingUpdateThing } = useThing().UpdateThing();

  const dataArray = data ? data.data.filter((item: Type) => item.removedBy === undefined) : [];

  const handleSubmit = (values: any) => {
    form
      .validateFields()
      .then(() => {
        if (showEdit) {
          const newObject = {
            ...values,
            image: image as File,
            thingId: selectedThing.id,
          };
          onUpdate(newObject);
        } else {
          const newObject = {
            ...values,
            image: image as File,
          };

          onSubmit(newObject);
        }
      })
      .catch(() => {
        openNotificationWithIcon('error', 'Something went wrong', 'oops validation failed');
      });
  };

  return (
    <Spin spinning={isLoadingAddThing || isLoadingUpdateThing}>
      <Form
        data-testid="device.form"
        form={form}
        layout="vertical"
        name="userForm"
        onFinish={handleSubmit}
      >
        <Form.Item
          initialValue={showEdit ? selectedThing.name : ''}
          name="name"
          label="Device Name"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[A-Za-z0-9._-]/,
              message: 'Name is invalid. Use Alphanumeric values',
            },
            {
              min: 5,
              message: 'Name requires at least 5 characters.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={showEdit ? selectedThing.description : ''}
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[A-Za-z0-9._-]/,
              message: 'Character is invalid. Use Alphanumeric values',
            },
            {
              min: 10,
              message: 'Description requires at least 10 characters.',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="image" label="Upload" valuePropName="fileList">
          <UploadAvatar />
        </Form.Item>
        <Form.Item
          initialValue={showEdit ? selectedThing.type : ''}
          name="type"
          label="Type"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[A-Za-z0-9._-]/,
              message: 'Name is invalid. Use Alphanumeric values',
            },
            {
              min: 4,
              message: 'Type requires at least 5 characters.',
            },
          ]}
        >
          <Select value="" style={{ width: 120 }}>
            {dataArray.map((item: Type) => (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          data-testid="isAvailable.toggle"
          initialValue={showEdit ? selectedThing.isAvailable : ''}
          valuePropName="checked"
          name="isAvailable"
          label="Available"
          rules={[{ required: true }]}
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" checked />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 20,
          }}
        >
          <Button key={1} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

DeviceForm.defaultProps = defaultProps;

export default DeviceForm;
