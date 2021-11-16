import styled from 'styled-components';

type BookingData = {
  title: string;
  date: Date;
};

interface BookingTimingsProps {
  item: BookingData;
}

const TimeContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  min-width: 40%;
  align-content: center;
  padding-top: 10px;
  justify-content: space-around;
`;

const StyledSpan = styled.span`
  font-weight: 700;
`;
// Start and end times display component.
const BookingTimings = ({ item }: BookingTimingsProps) => (
  <TimeContainer>
    <p>
      <StyledSpan>Start Time:</StyledSpan> {new Date(item.date).toLocaleTimeString()}
    </p>
    <p>
      <StyledSpan>End Time:</StyledSpan> {new Date(item.date).toLocaleTimeString()}{' '}
    </p>
  </TimeContainer>
);

export default BookingTimings;
