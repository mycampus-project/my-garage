import { Space } from 'antd';
import Search from 'antd/lib/input/Search';
import { useContext } from 'react';
import { AdminContext } from 'src/contexts/AdminContext';
import styled from 'styled-components';
import DeviceTypeSelector from '../Devices/DeviceTypeSelector';

const StyledOuterContainer = styled.div`
  display: flex;
  background-color: white;
  margin: 32px;
  width: 100%;
  border-radius: 2px;
`;

const StyledListContainer = styled.div`
  width: 100%;
  overflow: auto;
  padding: 0;

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

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  min-width: 260px;
  width: 40%;
  padding: 0;
`;

interface MainContainerProps {
  list: JSX.Element;
  details: JSX.Element;
  isDevice: boolean;
}

// Overall user component. List all users on right, and selected user details on left.
function MainContainer({ list, details, isDevice }: MainContainerProps) {
  const { setSearchValue } = useContext(AdminContext);

  const onSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
    <StyledOuterContainer>
      <LeftContainer>
        <Space direction="vertical" size="middle">
          {isDevice && <DeviceTypeSelector />}
          <Search placeholder="input search text" onSearch={onSearch} allowClear />
        </Space>
        <StyledListContainer>{list}</StyledListContainer>
      </LeftContainer>
      <StyledDetailsContainer>{details}</StyledDetailsContainer>
    </StyledOuterContainer>
  );
}

export default MainContainer;
