import { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Row, Col } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { blogServices } from '@api/BlogServices/BlogServices';

const { Title, Paragraph } = Typography;

export const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogServices.getAllBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className='container mx-auto p-6'>
      <Row gutter={[16, 16]}>
        {blogs.map((blog) => (
          <Col key={blog.id} xs={24} sm={12} lg={8}>
            <Link to={`detail/${blog.id}`}>
              {' '}
              {/* Wrap Card with Link */}
              <Card
                hoverable
                cover={
                  blog.blogImages.length > 0 && (
                    <img
                      src={
                        blog.blogImages.length > 0
                          ? `http://apijewelryauction.techx.id.vn:8081/uploads/blogs/${blog.blogImages[0].url}`
                          : 'http://example.com/image.jpg'
                      }
                      className='w-full h-48 object-cover'
                    />
                  )
                }
                className='bg-white shadow-md rounded-lg overflow-hidden'
              >
                <div className='p-4'>
                  <Title level={4} className='font-bold text-gray-800'>
                    {blog.title}
                  </Title>
                  <div dangerouslySetInnerHTML={createMarkup(blog.content)} />
                  <div className='flex items-center mt-4'>
                    <Avatar src={blog.user.imageUrl} size='large' />
                    <div className='ml-3'>
                      <Title level={5} className='mb-0 text-gray-800'>
                        {blog.user.full_name}
                      </Title>
                      <Paragraph className='text-gray-500 mb-0'>{blog.user.email}</Paragraph>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};
