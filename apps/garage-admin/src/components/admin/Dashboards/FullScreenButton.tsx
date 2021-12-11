import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  display: flex;
  width: fit-content;
  justify-self: flex-end;
  align-self: end;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

interface FullscreenButtonProps {
  onFullscreen: () => void;
}

const FullscreenButton = ({ onFullscreen }: FullscreenButtonProps) => (
  <ButtonContainer>
    <StyledButton type="primary" onClick={onFullscreen}>
      Fullscreen
    </StyledButton>
  </ButtonContainer>
);

export default FullscreenButton;
