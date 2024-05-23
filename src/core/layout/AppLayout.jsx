import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
const contentStyle = {
  textAlign: 'center',
  color: '#000',
  backgroundColor: '#fff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
export const AppLayout = ({ components }) => {
  return (
    <Layout>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>{components}</Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};
