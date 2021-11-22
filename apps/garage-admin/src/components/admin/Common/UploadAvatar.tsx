import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';

const UploadAvatar = () => {
  const { setImage } = useContext(AdminContext);

  return (
    <Upload
      accept=".png, .jpg, .jpeg"
      listType="picture"
      beforeUpload={(value) => {
        setImage(value);
        return false;
      }}
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Upload>
  );
};
export default UploadAvatar;
