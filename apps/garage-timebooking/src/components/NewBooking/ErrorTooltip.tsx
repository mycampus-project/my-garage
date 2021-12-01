import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  padding: var(--padding-xs) var(--padding-s);
  background: var(--ant-error-color-active);
  border-radius: 4px;
  color: white;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.06);
`;

interface Props {
  error: string;
}

const ErrorTooltip = ({ error }: Props) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!tooltipRef.current) return;
      const x = event.clientX;
      const y = event.clientY;

      tooltipRef.current.style.transform = `translate(${x + 20}px, ${y + 20}px)`;
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [error]);

  return <Root ref={tooltipRef}>{error}</Root>;
};

export default ErrorTooltip;
