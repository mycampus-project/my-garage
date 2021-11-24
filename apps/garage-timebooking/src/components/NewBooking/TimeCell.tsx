import styled, { css } from 'styled-components';
import { CELL_WIDTH, TableCell } from './common';

const TimeTableCell = styled(TableCell)<{
  isHighlighted: boolean;
  isUnavalilable: boolean;
  isSelected: boolean;
}>`
  flex: 1;

  &:nth-child(2n + 1) {
    background-color: #f8f8f8;
  }

  &:hover {
    background-color: var(--ant-primary-1);
  }

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      &,
      &:hover {
        background-color: var(--ant-primary-2) !important;
        color: black;
        border-color: transparent;
      }
    `};

  ${({ isSelected }) =>
    isSelected &&
    css`
      &,
      &:hover {
        background-color: var(--ant-primary-color) !important;
        color: white;
        border-color: transparent;
      }
    `};

  ${({ isUnavalilable }) =>
    isUnavalilable &&
    css`
      & {
        background-color: #c8c8c8 !important;
        border-color: transparent;
        cursor: not-allowed;
      }
    `};

  @media (max-width: 992px) {
    min-width: ${CELL_WIDTH}px;
  }
`;

interface Props {
  date: Date;
  isHighlighted: boolean;
  isUnavailable: boolean;
  isSelected: boolean;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: (date: Date) => void;
  onClick: (date: Date) => void;
}

const TimeCell: React.FC<Props> = ({
  date,
  isHighlighted,
  isUnavailable,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}) => (
  <TimeTableCell
    onClick={() => !isUnavailable && onClick(date)}
    isHighlighted={isHighlighted}
    isUnavalilable={isUnavailable}
    isSelected={isSelected}
    onMouseEnter={() => onMouseEnter(date)}
    onMouseLeave={() => onMouseLeave(date)}
  >
    {children}
  </TimeTableCell>
);

export default TimeCell;
