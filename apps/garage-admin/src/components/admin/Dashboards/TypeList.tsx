import 'antd/dist/antd.css';
import { Type } from '@my-garage/common';
import styled from 'styled-components';
import { List } from 'antd';
import TypeListItem from './TypeListItem';

const StyledListContainer = styled.div`
  max-height: 600px;
  width: 100%;
`;

interface RestoreTypeListProps {
  data: Type[];
  showRestore: boolean;
}

const TypeList = ({ data, showRestore }: RestoreTypeListProps) => (
  <StyledListContainer>
    <List
      data-testid="typeList"
      style={{ width: '100%' }}
      dataSource={data}
      renderItem={(item: Type) => (
        <TypeListItem key={item.id} item={item} showRestoreButtons={showRestore} />
      )}
    />
  </StyledListContainer>
);

export default TypeList;
