import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { CELL_WIDTH, TableCell } from './common';

const TimeTableCell = styled(TableCell)<{
  isHighlighted: boolean;
  isUnavalilable: boolean;
  isSelected: boolean;
  isInvalid: boolean;
  occupiedType: 'user' | 'unknown' | null;
}>`
  white-space: nowrap;

  &:hover {
    background-color: var(--ant-primary-1) !important;
  }

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      &,
      &:hover {
        background-color: var(--ant-primary-2) !important;
        color: black;
        border-color: transparent !important;
      }
    `};

  ${({ isSelected }) =>
    isSelected &&
    css`
      &,
      &:hover {
        background-color: var(--ant-primary-color) !important;
        color: white;
        border-color: transparent !important;
      }
    `};

  ${({ isUnavalilable }) =>
    isUnavalilable &&
    css`
      &,
      &:hover {
        background-color: #c8c8c8 !important;
        border-color: transparent !important;
        cursor: not-allowed;
      }
    `};

  ${({ occupiedType }) => {
    switch (occupiedType) {
      case 'user':
        return css`
          &,
          &:hover {
            background-color: ${lighten(0.3)('#69aa48')} !important;
            border-color: transparent !important;
            cursor: not-allowed;
          }
        `;
      case 'unknown':
        return css`
          &,
          &:hover {
            background-color: ${lighten(0.3)('#faad14')} !important;
            border-color: transparent !important;
            cursor: not-allowed;
          }
        `;
      default:
        return '';
    }
  }}

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      &,
      &:hover {
        background-color: var(--ant-error-color-hover) !important;
        color: black;
        border-color: transparent !important;
      }
    `}

  @media (max-width: 992px) {
    min-width: ${CELL_WIDTH}px;
  }
`;

interface Props {
  date: Date;
  isHighlighted: boolean;
  isUnavailable: boolean;
  isSelected: boolean;
  isInvalid: boolean;
  occupiedType: 'user' | 'unknown' | null;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: (date: Date) => void;
  onClick: (date: Date) => void;
}

const TimeCell: React.FC<Props> = ({
  date,
  isHighlighted,
  isUnavailable,
  isSelected,
  isInvalid,
  occupiedType,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}) => (
  <TimeTableCell
    onClick={() => !isUnavailable && !occupiedType && onClick(date)}
    isHighlighted={isHighlighted}
    isUnavalilable={isUnavailable}
    isInvalid={isInvalid}
    isSelected={isSelected}
    occupiedType={occupiedType}
    onMouseEnter={() => onMouseEnter(date)}
    onMouseLeave={() => onMouseLeave(date)}
  >
    {children}
  </TimeTableCell>
);

export default TimeCell;
