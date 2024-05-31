import { Layout } from 'antd';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
const { Header, Footer, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 140,
  lineHeight: '64px',
  backgroundColor: '#fff',
};
const contentStyle = {
  textAlign: 'center',
  color: '#000',
  backgroundColor: '#fff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#000',
  backgroundColor: '#fff',
};
export const AppLayout = ({ components }) => {
  return (
    <Layout>
      <Header style={headerStyle}>
        <AppHeader />
      </Header>
      <Content className='container mx-auto' style={contentStyle}>
        {components}
      </Content>
      <Footer style={footerStyle}>
        <AppFooter />
      </Footer>
    </Layout>
  );
};
