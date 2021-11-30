import { Thing } from '@my-garage/common';
import { Select, Space, Tag } from 'antd';

const { Option } = Select;

interface DashboardPickerProps {
  onSelect: (value: string[]) => void;
  data: Thing[];
  defaultData: string[];
}

const DashboardPicker = ({ onSelect, data, defaultData }: DashboardPickerProps) => (
  <Space direction="vertical" size="middle">
    <h2>Select your Dashboard Items (max 5 devices):</h2>
    <Select
      mode="multiple"
      allowClear
      placeholder="Select Devices..."
      style={{ width: '100%' }}
      defaultValue={defaultData}
      value={defaultData}
      onChange={onSelect}
      tagRender={() => <Tag visible={false} />}
    >
      {data.map((item) => (
        <Option key={item.id} value={item.name}>
          {item.name}
        </Option>
      ))}
    </Select>
  </Space>
);

export default DashboardPicker;
