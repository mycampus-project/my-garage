import { Thing } from '@my-garage/common';
import moment from 'moment';
import { DatePicker, PageHeader, Space, Form, Typography } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  padding: var(--padding-m);
`;

const CELL_WIDTH = 200;

const Table = styled.table`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  min-width: 0;
  position: relative;
  table-layout: fixed;

  @media (max-width: 992px) {
    display: block;
  }

  tbody tr {
    &:nth-child(2n + 1) {
      background-color: #f7f7f7;
    }
    &:nth-child(2n) {
      background-color: white;
    }
  }

  th,
  td {
    border: 1px solid rgba(0, 0, 0, 0.06);
    padding: var(--padding-xs);
  }
`;

const TimeTh = styled.th`
  position: sticky;
  left: 0;
  min-width: 100px;
  background-color: inherit;
`;

const timeRanges = [
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
];

const SelectableTd = styled.td`
  @media (max-width: 992px) {
    min-width: ${CELL_WIDTH}px;
  }

  &:hover {
    background-color: var(--ant-primary-1);
  }
`;

interface Props {
  thing: Thing;
  onBackClick: () => void;
}

const DeviceBooking = ({ thing, onBackClick }: Props) => {
  const [selectedWeek, setSelectedWeek] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>();
  console.log(selectedWeek, selectedYear);
  return (
    <>
      <PageHeader
        title={thing.name}
        footer={<Typography.Paragraph type="secondary">{thing.description}</Typography.Paragraph>}
        ghost
        onBack={onBackClick}
      />
      <Root>
        <Space direction="vertical">
          <Form layout="vertical">
            <Form.Item label="Select week">
              <DatePicker
                defaultValue={moment()}
                onChange={(value, dateString) => {
                  if (!value) return;
                  console.log(dateString);
                  setSelectedWeek(value.week());
                  setSelectedYear(value.year());
                }}
                picker="week"
              />
            </Form.Item>
          </Form>
        </Space>
        <Table>
          <thead>
            <tr>
              <th>-</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {timeRanges.map((item) => (
              <tr>
                <TimeTh>{item}</TimeTh>
                <SelectableTd />
                <SelectableTd />
                <SelectableTd />
                <SelectableTd />
                <SelectableTd />
              </tr>
            ))}
          </tbody>
        </Table>
      </Root>
    </>
  );
};

export default DeviceBooking;
