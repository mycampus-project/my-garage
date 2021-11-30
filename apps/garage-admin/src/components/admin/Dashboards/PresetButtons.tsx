import { Type } from '@my-garage/common';
import { Button, Space } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

interface PresetButtonsProps {
  types: Type[];
  onClear: () => void;
  onPresetSelect: (name: string) => void;
}

const PresetButtons = ({ types, onClear, onPresetSelect }: PresetButtonsProps) => (
  <Container>
    <Space direction="vertical" size="middle">
      <h3>Presets</h3>
      <Space direction="horizontal" size="middle" wrap>
        {types.map((item) => (
          <Button
            key={item.id}
            type="primary"
            onClick={() => {
              onClear();
              onPresetSelect(item.name);
            }}
          >
            {item.name}
          </Button>
        ))}
      </Space>
    </Space>
  </Container>
);

export default PresetButtons;
