import styled from 'styled-components';
import { format, getWeek } from 'date-fns';

import { useEffect, useState } from 'react';
import { TableCell } from './common';
import TimeCell from './TimeCell';

const WeekdayHeaderCell = styled.th`
  z-index: 100;
  scroll-snap-align: start;
`;

const Root = styled.table`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  min-width: 0;
  border-collapse: collapse;

  @media (max-width: 992px) {
    display: block;
    scroll-snap-type: x mandatory;
    scroll-padding-inline-start: 51px;
  }

  tbody tr {
    &:nth-child(2n + 1) ${TableCell} {
      background-color: #f7f7f7;
    }
    &:nth-child(2n) ${TableCell} {
      background-color: white;
    }
  }

  & ${WeekdayHeaderCell}, & ${TableCell} {
    border: 1px solid #f0f0f0;
  }
`;

const HourHeaderCell = styled(TableCell).attrs(() => ({ as: 'th' }))<{ isHighlighted: boolean }>`
  position: sticky;
  left: 0;
  z-index: 1;
  min-width: max-content;
  ${({ isHighlighted }) => isHighlighted && 'background-color: var(--ant-primary-1) !important'};
`;

interface Props {
  dateCells: Date[][];
  onCellClick: (cellDate: Date) => void;
  onHoveredCellChange: (cellDate: Date | null) => void;
  getIsTableCellSelected: (cellDate: Date) => boolean;
  getIsTableCellHighlighted: (cellDate: Date) => boolean;
  getIsTableCellUnavailable: (cellDate: Date) => boolean;
  getIsTableCellInvalid: (cellDate: Date) => boolean;
  getTimeCellText: (cellDate: Date) => string | null;
}

const Table = ({
  dateCells,
  onHoveredCellChange,
  getIsTableCellSelected,
  getIsTableCellHighlighted,
  getIsTableCellUnavailable,
  getIsTableCellInvalid,
  getTimeCellText,
  onCellClick,
}: Props) => {
  const [hoveredCell, setHoveredCell] = useState<Date | null>(null);

  useEffect(() => {
    onHoveredCellChange(hoveredCell);
  }, [hoveredCell, onHoveredCellChange]);

  return (
    <Root>
      <thead>
        <tr>
          <TableCell as="th">Week {getWeek(dateCells[0][0])}</TableCell>
          {dateCells.map(([first]) => (
            <WeekdayHeaderCell key={first.getTime()}>
              {format(first, 'eee d.MM.y')}
            </WeekdayHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {(() => {
          const rotatedMatrix: Date[][] = new Array(dateCells[0].length).fill(null).map(() => []);

          dateCells.forEach((column, index) =>
            column.forEach((date, columnIndex) => {
              rotatedMatrix[columnIndex][index] = date;
            }),
          );

          return rotatedMatrix.map((row) => (
            <tr key={`${row[0].getHours()}-${row[0].getMinutes()}`}>
              <HourHeaderCell
                isHighlighted={
                  !!hoveredCell &&
                  row[0].getHours() === hoveredCell.getHours() &&
                  row[0].getMinutes() === hoveredCell.getMinutes()
                }
              >
                {format(row[0], 'HH:mm')}
              </HourHeaderCell>
              {row.map((date) => (
                <TimeCell
                  key={date.getTime()}
                  date={date}
                  onClick={onCellClick}
                  isSelected={getIsTableCellSelected(date)}
                  isHighlighted={getIsTableCellHighlighted(date)}
                  isUnavailable={getIsTableCellUnavailable(date)}
                  isInvalid={getIsTableCellInvalid(date)}
                  onMouseEnter={setHoveredCell}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {getTimeCellText(date)}
                </TimeCell>
              ))}
            </tr>
          ));
        })()}
      </tbody>
    </Root>
  );
};

export default Table;
