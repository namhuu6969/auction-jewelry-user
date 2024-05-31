import { Layout, Typography, Card } from 'antd';
const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const About = () => {
  return (
    <Layout className='min-h-screen bg-gray-100'>
      <Content className='p-8'>
        <Card className='max-w-4xl mx-auto'>
          <Title level={1} className='text-center mb-8'>
            Về Chúng Tôi
          </Title>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <img
              src='https://via.placeholder.com/600x400'
              alt='Our Team'
              className='w-full h-auto object-cover rounded'
            />
            <div>
              <Title level={2} className='mb-4'>
                Tầm nhìn và Sứ mệnh
              </Title>
              <Paragraph>
                Chúng tôi là một đội ngũ đầy nhiệt huyết với mục tiêu mang lại những giá trị tốt
                nhất cho khách hàng. Tầm nhìn của chúng tôi là trở thành công ty dẫn đầu trong lĩnh
                vực của mình, cung cấp các sản phẩm và dịch vụ chất lượng vượt trội.
              </Paragraph>
              <Paragraph>
                Sứ mệnh của chúng tôi là không ngừng đổi mới và sáng tạo, đáp ứng mọi nhu cầu của
                khách hàng bằng các giải pháp tiên tiến và hiệu quả nhất.
              </Paragraph>
              <Title level={2} className='mt-8 mb-4'>
                Giá trị cốt lõi
              </Title>
              <Paragraph>
                Chúng tôi cam kết luôn đặt khách hàng lên hàng đầu, tôn trọng và trung thực trong
                mọi giao dịch, đồng thời phát triển bền vững với cộng đồng và môi trường.
              </Paragraph>
            </div>
          </div>
          <div className='mt-12'>
            <Title level={2} className='mb-4 text-center'>
              Đội ngũ của chúng tôi
            </Title>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Team Member'
                  className='w-32 h-32 rounded-full mx-auto mb-4'
                />
                <Title level={4}>Nguyễn Văn A</Title>
                <Paragraph>Giám đốc điều hành</Paragraph>
              </div>
              <div className='text-center'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Team Member'
                  className='w-32 h-32 rounded-full mx-auto mb-4'
                />
                <Title level={4}>Trần Thị B</Title>
                <Paragraph>Giám đốc tài chính</Paragraph>
              </div>
              <div className='text-center'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Team Member'
                  className='w-32 h-32 rounded-full mx-auto mb-4'
                />
                <Title level={4}>Phạm Văn C</Title>
                <Paragraph>Giám đốc kỹ thuật</Paragraph>
              </div>
            </div>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};
