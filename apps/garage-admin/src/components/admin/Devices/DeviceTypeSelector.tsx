import { Type } from '@my-garage/common';
import { Select } from 'antd';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import useType from 'src/hooks/useType';

const { Option } = Select;

const DeviceTypeSelector = () => {
  const { data } = useType().GetListOfTypes();
  const dataArray = data ? data.data.filter((item: Type) => item.removedBy === undefined) : [];
  const { setTypeFilter } = useContext(AdminContext);

  const handleChange = (value: string[]) => {
    setTypeFilter(value);
  };

  return (
    <Select
      allowClear
      mode="multiple"
      placeholder="Select Type..."
      style={{ width: '100%' }}
      onChange={handleChange}
    >
      {dataArray.map((item) => (
        <Option key={item.id} value={item.name}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};
export default DeviceTypeSelector;
