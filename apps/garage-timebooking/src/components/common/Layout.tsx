import { PageHeader, Spin } from 'antd';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import ListSection from './ListSection';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CenteredLayout = styled.div`
  @media screen and (max-width: 992px) {
    padding: var(--padding-m);
  }
  display: flex;
  flex-direction: column;
  padding: var(--padding-xl);
  width: 100%;
  height: 100%;
  min-height: 0;
`;

const Left = styled.div<{ hasSelectedItem: boolean }>`
  overflow: auto;
  padding-top: 0;
  position: relative;
`;

const Right = styled.div<{ hasSelectedItem: boolean }>`
  grid-column: 2;
  max-width: 100%;
  min-width: 0;
  overflow: auto;
`;

const Content = styled.div<{ hasSelectedItem: boolean }>`
  width: 100%;
  height: 100%;
  min-height: 0;

  background-color: white;

  display: grid;
  grid-template-columns: 30% auto;

  // Desktop XL and above
  @media (min-width: 1400px) {
    grid-template-columns: 20% auto;
  }

  // Small laptop and below
  @media (max-width: 992px) {
    grid-template-columns: ${({ hasSelectedItem }) => (hasSelectedItem ? '0 100%' : '100% 0')};
    ${Left} {
      ${({ hasSelectedItem }) => hasSelectedItem && 'display: none;'}
    }
    ${Right} {
      ${({ hasSelectedItem }) => !hasSelectedItem && 'display: none;'}
    }
  }
`;

const StyledSpinner = styled(Spin)`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
`;

interface Props<T extends { id: string }> {
  pageTitle: string;
  listSections: Record<string, T[]> | null;
  isLoadingList: boolean;
  renderItem: (item: T, isSelected: boolean, onClick: () => void) => JSX.Element;
  renderContent: (item: T | null, clearSelectedItem: () => void) => ReactNode;
}

const Layout = <T extends { id: string }>({
  pageTitle,
  isLoadingList,
  listSections,
  renderItem,
  renderContent,
}: Props<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  return (
    <Root>
      <PageHeader title={pageTitle} />
      <CenteredLayout>
        <Content hasSelectedItem={!!selectedItem}>
          <Left hasSelectedItem={!!selectedItem}>
            {isLoadingList && <StyledSpinner size="large" />}
            {listSections &&
              Object.entries(listSections).map(([type, itemsOfType]) => (
                <ListSection
                  key={type}
                  items={itemsOfType}
                  onItemSelect={setSelectedItem}
                  listHeader={type}
                  selectedItem={selectedItem}
                  renderItem={renderItem}
                />
              ))}
          </Left>
          <Right hasSelectedItem={!!selectedItem}>
            {renderContent(selectedItem, () => setSelectedItem(null))}
          </Right>
        </Content>
      </CenteredLayout>
    </Root>
  );
};

export default Layout;
