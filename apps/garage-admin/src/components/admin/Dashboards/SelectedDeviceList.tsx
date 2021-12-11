import { Thing } from '@my-garage/common';
import { Space } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 32px;
`;

interface SelectedDeviceListProps {
  selectedList: Thing[];
}

const SelectedDeviceList = ({ selectedList }: SelectedDeviceListProps) => (
  <Container>
    <Space direction="vertical" size="middle">
      <h3>Selected Devices:</h3>
      {selectedList.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </Space>
  </Container>
);

export default SelectedDeviceList;
