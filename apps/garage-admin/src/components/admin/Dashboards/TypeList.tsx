import 'antd/dist/antd.css';
import { Type } from '@my-garage/common';
import styled from 'styled-components';
import { List } from 'antd';
import TypeListItem from './TypeListItem';

const StyledListContainer = styled.div`
  max-height: 600px;
  overflow: auto;
  width: 100%;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px var(--ant-primary-2);
  }
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
