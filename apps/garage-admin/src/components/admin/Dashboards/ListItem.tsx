import { List } from 'antd';
import { Thing } from '@my-garage/common';
import styled from 'styled-components';

interface ListItemProps {
  item: Thing;
}

const ListItemMeta = styled(List.Item.Meta)`
  display: flex;
  background-color: #f1f6fd;
  padding: 16px;
  cursor: 'pointer';
  border-radius: 5px;
  border: 1px solid #00000075;
`;

const StyledListItem = styled(List.Item)`
  padding: 16px;
  position: relative;
  height: 150px;
`;

const StyledTitle = styled.p`
  display: flex;
  justify-self: center;
  align-items: center;
  font-size: 60px;
  height: 100px;
  margin: auto;
  margin-left: 10%;
`;

const Circle = styled.div`
  width: 120px;
  height: 120px;
  background-color: #aaffaa;
  border-radius: 50%;
  margin-left: 16px;
`;

const ListItem = ({ item }: ListItemProps) => (
  <StyledListItem data-testid="deviceList.item" key={item.name}>
    <ListItemMeta
      data-testid="deviceList.item.meta"
      avatar={<Circle />}
      title={<StyledTitle> {item.name}</StyledTitle>}
    />
  </StyledListItem>
);

export default ListItem;
