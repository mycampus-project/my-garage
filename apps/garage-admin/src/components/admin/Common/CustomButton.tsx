import { Button } from 'antd';

interface ButtonProps {
  onClick: () => void;
  Label: string;
}

const CustomButton = ({ onClick, Label }: ButtonProps) => (
  <Button
    type="primary"
    onClick={() => {
      onClick();
    }}
  >
    {Label}
  </Button>
);

export default CustomButton;
