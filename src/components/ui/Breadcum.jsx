import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Breadcum = ({linkBreadcum = []}) => {
  
  return (
    <Breadcrumb className='text-lg'>
      {linkBreadcum.map((link) => (
        <Breadcrumb.Item key={link.link}>
          <Link className='font-semibold font-serif !text-black' to={link.link}>
            {link.name}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcum;
