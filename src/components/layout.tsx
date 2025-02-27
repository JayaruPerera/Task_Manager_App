import { Layout as AntLayout, Menu } from 'antd';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const { Header, Content, Footer } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" style={{ float: 'left', color: 'white', fontSize: '1.5rem' }}>
          Task Manager
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={[
            { 
              key: '/', 
              icon: <UnorderedListOutlined />, 
              label: <Link to="/">Tasks</Link> 
            },
            { 
              key: '/add', 
              icon: <PlusOutlined />, 
              label: <Link to="/add">Add Task</Link> 
            },
          ]}
        />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380, background: '#fff', marginTop: 24 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Task Manager ©{new Date().getFullYear()}</Footer>
    </AntLayout>
  );
};

export default Layout;