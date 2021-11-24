import styled from 'styled-components';
import { format, getWeek } from 'date-fns';

import { useEffect, useState } from 'react';
import { TableCell } from './common';
import TimeCell from './TimeCell';

const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;

  & > div:not(:first-of-type) {
    margin-top: -1px;
  }
`;
const HeaderColumn = styled(TableColumn)`
  position: sticky;
  left: 0;
`;

const Root = styled.div`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  min-width: 0;
  position: relative;
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  scroll-snap-type: x mandatory;
  scroll-padding-left: 100px;

  & > ${TableColumn}:not(:first-child) {
    margin-left: -1px;
  }

  tbody tr {
    &:nth-child(2n + 1) {
      background-color: #f7f7f7;
    }
    &:nth-child(2n) {
      background-color: white;
    }
  }
`;

const WeekdayHeaderCell = styled(TableCell)`
  z-index: 100;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

const HourHeaderCell = styled(TableCell)<{ isHighlighted: boolean }>`
  position: sticky;
  left: 0;
  z-index: 1;
  ${({ isHighlighted }) => isHighlighted && 'background-color: var(--ant-primary-1)'};
`;

interface Props {
  dateCells: Date[][];
  onCellClick: (cellDate: Date) => void;
  onHoveredCellChange: (cellDate: Date | null) => void;
  getIsTableCellSelected: (cellDate: Date) => boolean;
  getIsTableCellHighlighted: (cellDate: Date) => boolean;
  getIsTableCellUnavailable: (cellDate: Date) => boolean;
  getTimeCellText: (cellDate: Date) => string | null;
}

const Table = ({
  dateCells,
  onHoveredCellChange,
  getIsTableCellSelected,
  getIsTableCellHighlighted,
  getIsTableCellUnavailable,
  getTimeCellText,
  onCellClick,
}: Props) => {
  const [hoveredCell, setHoveredCell] = useState<Date | null>(null);

  useEffect(() => {
    onHoveredCellChange(hoveredCell);
  }, [hoveredCell, onHoveredCellChange]);

  return (
    <Root>
      <HeaderColumn>
        <TableCell>Week {getWeek(dateCells[0][0])}</TableCell>
        {dateCells[0].map((date) => (
          <HourHeaderCell
            isHighlighted={
              !!hoveredCell &&
              date.getHours() === hoveredCell.getHours() &&
              date.getMinutes() === hoveredCell.getMinutes()
            }
          >
            {format(date, 'HH:mm')}
          </HourHeaderCell>
        ))}
      </HeaderColumn>
      {dateCells.map((weekdayOptions) => (
        <TableColumn key={weekdayOptions[0].getDay()}>
          <WeekdayHeaderCell>{format(weekdayOptions[0], 'eee d.MM.y')}</WeekdayHeaderCell>
          {weekdayOptions.map((date) => (
            <TimeCell
              key={date.getTime()}
              date={date}
              onClick={onCellClick}
              isSelected={getIsTableCellSelected(date)}
              isHighlighted={getIsTableCellHighlighted(date)}
              isUnavailable={getIsTableCellUnavailable(date)}
              onMouseEnter={setHoveredCell}
              onMouseLeave={() => setHoveredCell(null)}
            >
              {getTimeCellText(date)}
            </TimeCell>
          ))}
        </TableColumn>
      ))}
    </Root>
  );
};

export default Table;
