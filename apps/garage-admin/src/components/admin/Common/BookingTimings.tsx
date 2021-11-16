import styled from 'styled-components';
import { User } from '@my-garage/common';

type BookingData = {
  title: string;
  date: Date;
  user: User;
};

interface BookingTimingsProps {
  item: BookingData;
  things: boolean;
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
const BookingTimings = ({ item, things }: BookingTimingsProps) => (
  <TimeContainer>
    {things && (
      <>
        <StyledSpan>User:</StyledSpan> <p>{item.user.fullName}</p>
      </>
    )}
    <p>
      <StyledSpan>Start Time:</StyledSpan> {new Date(item.date).toLocaleTimeString()}
    </p>
    <p>
      <StyledSpan>End Time:</StyledSpan> {new Date(item.date).toLocaleTimeString()}{' '}
    </p>
  </TimeContainer>
);

export default BookingTimings;
