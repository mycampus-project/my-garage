import styled from 'styled-components';
import { Thing } from '@my-garage/common';
import { List, Typography } from 'antd';

const StyledListItem = styled(List.Item)<{ $isSelected: boolean }>`
  cursor: pointer;
  padding: var(--padding-m);
  position: relative;
  background-color: ${({ $isSelected }) => ($isSelected ? 'var(--ant-primary-1)' : 'transparent')};

  &:hover {
    background-color: var(--ant-primary-1);
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    width: 6px;
    height: 100%;
    background-color: ${({ $isSelected }) =>
      $isSelected ? 'var(--ant-primary-color)' : 'transparent'};
    transition: transform 100ms ease-out;
    transform: scaleY(${({ $isSelected }) => ($isSelected ? 1 : 0)});
  }
`;

interface Props {
  isSelected: boolean;
  onClick: (item: Thing) => void;
  item: Thing;
}

const DeviceListItem = ({ isSelected, item, onClick }: Props) => (
  <StyledListItem $isSelected={isSelected} tabIndex={0} onClick={() => onClick(item)}>
    <List.Item.Meta
      title={item.name}
      description={
        <Typography.Paragraph
          type="secondary"
          style={{
            marginBottom: 0,
          }}
          ellipsis={{
            rows: 2,
          }}
        >
          {item.description}
        </Typography.Paragraph>
      }
    />
  </StyledListItem>
);

export default DeviceListItem;
