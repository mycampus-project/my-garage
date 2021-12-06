import styled, { css } from 'styled-components';
import { Thing } from '@my-garage/common';
import { Avatar, List, Tooltip, Typography } from 'antd';

const StyledListItem = styled(List.Item)<{ $isSelected: boolean; $isDisabled: boolean }>`
  cursor: pointer;
  padding: var(--padding-m);
  position: relative;
  background-color: ${({ $isSelected }) => ($isSelected ? 'var(--ant-primary-1)' : 'transparent')};
  &:hover {
    background-color: var(--ant-primary-1);
  }

  ${(p) =>
    p.$isDisabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;

      &:hover {
        background-color: transparent;
      }
    `}

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
  isDisabled: boolean;
}

const DeviceListItem = ({ isSelected, item, onClick, isDisabled }: Props) => {
  const content = (
    <StyledListItem
      $isSelected={isSelected}
      tabIndex={0}
      onClick={() => !isDisabled && onClick(item)}
      $isDisabled={isDisabled}
    >
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

  if (isDisabled) {
    return (
      <Tooltip placement="right" title="Device is temporarily disabled">
        {content}
      </Tooltip>
    );
  }
  return content;
};

export default DeviceListItem;
