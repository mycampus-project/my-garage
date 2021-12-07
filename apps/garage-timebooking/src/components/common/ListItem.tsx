import styled, { css } from 'styled-components';
import { Avatar, List, Tooltip, Typography } from 'antd';
import { RefObject } from 'react';

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
  title: string;
  description: string;
  imageUrl?: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  disabledTooltipText?: string;
  containerRef?: RefObject<HTMLDivElement>;
}

const ListItem = ({
  isSelected,
  title,
  description,
  imageUrl,
  onClick,
  isDisabled,
  disabledTooltipText,
  containerRef,
}: Props) => {
  const content = (
    <div ref={containerRef}>
      <StyledListItem
        $isSelected={isSelected}
        tabIndex={0}
        onClick={() => !isDisabled && onClick()}
        $isDisabled={isDisabled ?? false}
      >
        <List.Item.Meta
          title={title}
          avatar={
            imageUrl && (
              <Avatar
                size={{ xs: 50, sm: 50, md: 50, lg: 60, xl: 60, xxl: 60 }}
                src={`${process.env.REACT_APP_BACKEND_URL}/static/${imageUrl}`}
              />
            )
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
              {description}
            </StyledDescription>
          }
        />
      </StyledListItem>
    </div>
  );

  if (isDisabled) {
    return (
      <Tooltip placement="right" title={disabledTooltipText}>
        {content}
      </Tooltip>
    );
  }
  return content;
};

export default ListItem;
