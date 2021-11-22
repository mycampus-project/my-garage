import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { useState } from 'react';

const UploadAvatar = () => {
  const [files] = useState<UploadFile<any>[]>([]);

  return (
    <Upload
      accept=".png, .jpg, .jpeg"
      listType="picture"
      beforeUpload={() => false}
      defaultFileList={[...files] as UploadFile<any>[]}
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Upload>
  );
};
export default UploadAvatar;
