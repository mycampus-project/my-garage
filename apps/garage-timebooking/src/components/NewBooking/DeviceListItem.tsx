import styled from 'styled-components';
import { Thing } from '@my-garage/common';
import { Avatar, List, Typography } from 'antd';

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

const StyledDescription = styled(Typography.Paragraph)`
  white-space: pre-wrap;
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
      avatar={
        <Avatar
          size={{ xs: 50, sm: 50, md: 50, lg: 60, xl: 60, xxl: 60 }}
          src={`${process.env.REACT_APP_BACKEND_URL}/static/${item.imageUrl}`}
        />
      }
      description={
        <StyledDescription
          type="secondary"
          style={{
            marginBottom: 0,
          }}
          ellipsis={{
            rows: 3,
          }}
        >
          {item.description}
        </StyledDescription>
      }
    />
  </StyledListItem>
);

export default DeviceListItem;
