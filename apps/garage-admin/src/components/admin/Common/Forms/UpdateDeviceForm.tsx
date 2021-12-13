import { Type, User } from '@my-garage/common';
import { Form, Input, Switch, Select, Button, Spin } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import useThing from 'src/hooks/useThing';
import useType from 'src/hooks/useType';
import useUser from 'src/hooks/useUser';
import { AddDeviceFormProps } from 'src/types/adminTypes';
import { sortedUserArray } from 'src/utilities/utilityFunctions';

import openNotificationWithIcon from '../OpenNotificationWithIcon';
import UploadAvatar from '../UploadAvatar';

const { Option } = Select;
const { TextArea } = Input;

interface FormValues {
  name: string;
  description: string;
  contactPerson: string;
  image: File;
  isAvailable: boolean;
  type: string;
}

type FormSubmitValues = FormValues & {
  thingId: string;
};

const UpdateDeviceForm = ({ form }: AddDeviceFormProps) => {
  const { image, selectedThing } = useContext(AdminContext);
  const { data, isLoading } = useType().GetListOfTypes();
  const { data: userList, isLoading: isLoadingUserList } = useUser().GetListOfUsers();
  const { onUpdate, isLoadingUpdateThing } = useThing().UpdateThing();

  const dataArray = data ? data.data.filter((item: Type) => item.removedBy === undefined) : [];
  const userArray = userList
    ? userList.data.filter((item: User) => item.removedBy === undefined)
    : [];

  const sortedUserList = sortedUserArray(userArray, 'fullname');

  const findUserId = (name: string) => {
    const array = sortedUserList.filter((user) => user.fullName === name);
    return array[0].id;
  };

  const handleSubmit = (values: FormValues) => {
    form
      .validateFields()
      .then(() => {
        const newObject: FormSubmitValues = {
          name: values.name,
          description: values.description,
          contactPerson: findUserId(values.contactPerson),
          isAvailable: values.isAvailable,
          type: values.type,
          image: image as File,
          thingId: selectedThing ? selectedThing.id : '',
        };
        onUpdate(newObject);
      })
      .catch(() => {
        openNotificationWithIcon('error', 'Something went wrong', 'oops validation failed');
      });
  };

  return (
    <Spin spinning={isLoadingUpdateThing || isLoading || isLoadingUserList}>
      <Form
        data-testid="device.form"
        form={form}
        layout="vertical"
        name="userForm"
        onFinish={handleSubmit}
      >
        <Form.Item
          initialValue={selectedThing ? selectedThing.name : ''}
          name="name"
          label="Device Name"
          rules={[
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
          initialValue={selectedThing ? selectedThing.description : ''}
          name="description"
          label="Description"
          rules={[
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
          initialValue={selectedThing ? selectedThing.contactPerson.fullName : ''}
          name="contactPerson"
          label="Device Contact Person"
          rules={[
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
          <Select value="" style={{ width: 160 }} showSearch>
            {sortedUserList.map((item: User) => (
              <Option key={item.id} value={item.fullName}>
                {item.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={selectedThing ? selectedThing.type : ''}
          name="type"
          label="Type"
          rules={[
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
          initialValue={selectedThing ? selectedThing?.isAvailable : ''}
          valuePropName="checked"
          name="isAvailable"
          label="Available"
          rules={[{ required: true }]}
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" checked />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 20,
          }}
        >
          <Button key={1} type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateDeviceForm;
