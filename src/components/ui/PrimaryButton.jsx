import { Button } from 'antd';

export const PrimaryButton = ({ children, className, ...rest }) => {
  return (
    <Button
      {...rest}
      type='primary'
      className={`bg-[#946257] font-serif text-white !border-[#946257] h-fit font-semibold
        hover:!border-[1px] hover:!border-solid hover:!border-[#946257] hover:!bg-[#946257] hover:!text-white ${className}`}
    >
      {children}
    </Button>
  );
};
