import { Button } from 'antd';

export const SecondaryButton = ({ children, className, ...rest }) => {
  return (
    <Button
      {...rest}
      className={`bg-[#9462572b] font-serif text-[#946257] !border-[#946257] h-fit font-thin w-fit
              hover:!border-[1px] hover:!border-solid hover:!border-[#946257] hover:!bg-[#9462572b] hover:!text-[#946257] ${className}`}
    >
      {children}
    </Button>
  );
};
