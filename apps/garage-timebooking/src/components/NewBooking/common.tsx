import styled from 'styled-components';

export const CELL_WIDTH = 200;

export const TableCell = styled.td`
  text-align: center;
  line-height: 1;
  background: white;
  height: 16px;
  width: 1px; // Stops cell from growing in width
`;
