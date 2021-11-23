import styled from 'styled-components';
import { BookingData } from '../../../types/adminTypes';

interface BookingTimingsProps {
  item: BookingData;
}

const TimeContainer = styled.p`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

  @media screen and (min-width: 1199px) {
    div {
      margin-left: 16px;
      flex-wrap: nowrap;
    }
  }
`;

const StyledSpan = styled.span`
  font-weight: 700;
`;
// Start and end times display component.
const BookingTimings = ({ item }: BookingTimingsProps) => (
  <TimeContainer>
    <div>
      <StyledSpan>Date:</StyledSpan> {new Date(item.date).toLocaleDateString()}
    </div>
    <div>
      <StyledSpan>Start Time:</StyledSpan> {new Date(item.date).toLocaleTimeString()}
    </div>
    <div>
      <StyledSpan>End Time:</StyledSpan> {new Date(item.date).toLocaleTimeString()}
    </div>
  </TimeContainer>
);

export default BookingTimings;
