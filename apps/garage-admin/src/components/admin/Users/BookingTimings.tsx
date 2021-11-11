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

const Bold = styled.span`
  font-weight: 500;
`;

const BookingTimings = ({ item }: BookingTimingsProps) => (
  <TimeContainer>
    <p>
      <Bold>Start Time:</Bold> {new Date(item.date).toLocaleTimeString()}
    </p>
    <p>
      <Bold>End Time:</Bold> {new Date(item.date).toLocaleTimeString()}
    </p>
  </TimeContainer>
);

export default BookingTimings;
