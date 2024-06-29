import { Typography } from 'antd';

const {Title} = Typography

const TitleLabel = ({children, className, level= 5}) => {
  return <Title level={level} className={`!m-0 !font-sans !font-normal ${className}`}>{children}</Title>
}

export default TitleLabel