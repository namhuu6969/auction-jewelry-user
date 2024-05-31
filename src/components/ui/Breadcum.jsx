import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Breadcum = ({ linkBreadcum = [] }) => {
  const breadcrumbItems = linkBreadcum.map((link) => ({
    key: link.link,
    title: (
      <Link className='font-semibold font-serif !text-black' to={link.link}>
        {link.name}
      </Link>
    ),
  }));

  return <Breadcrumb className='text-lg' items={breadcrumbItems} />;
};

export default Breadcum;
