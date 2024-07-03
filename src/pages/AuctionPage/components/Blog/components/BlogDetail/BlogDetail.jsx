import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, Divider } from 'antd';
import { blogServices } from '@api/BlogServices/BlogServices';

const { Title, Paragraph } = Typography;

export const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const response = await blogServices.getBlogById(id);
        setBlog(response.data);
      } catch (error) {
        console.error(`Error fetching blog with ID ${id}:`, error);
      }
    };
    fetchBlogById();
  }, [id]);

  if (!blog) {
    return <div className='container mx-auto p-6'>Loading...</div>;
  }

  // Function to create a DOM element and set its innerHTML safely
  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='max-w-3xl mx-auto'>
        <Title level={2} className='font-bold text-3xl mb-4'>
          {blog.title}
        </Title>
        {blog.blogImages.length > 0 && (
          <img
            src={
              blog.blogImages.length > 0
                ? `http://167.71.212.203:8080/uploads/jewelry/${blog.blogImages[0].url}`
                : 'http://example.com/image.jpg'
            }
            className='w-full h-64 object-cover rounded-lg mb-4'
          />
        )}
        <div className='flex items-center mb-4'>
          <Avatar src={blog.user.imageUrl} size='large' />
          <div className='ml-3'>
            <Title level={5} className='mb-0'>
              {blog.user.full_name}
            </Title>
            <Paragraph className='text-gray-500 mb-0'>{blog.user.email}</Paragraph>
          </div>
        </div>
        <Divider />
        {/* Render HTML content safely */}
        <div className='text-gray-800 leading-relaxed'>
          <div dangerouslySetInnerHTML={createMarkup(blog.content)} />
        </div>
      </div>
    </div>
  );
};
