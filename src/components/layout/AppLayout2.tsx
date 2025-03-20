import React, { useState } from 'react';
import Icon from "@ant-design/icons";

import { Outlet } from "react-router";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import AppFooter from '../commun/AppFooter';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: (
      <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
        Edit profile
      </a>
    ),
    key: '0',
    icon: <UserOutlined />
  },
  {
    label: (
      <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
        Configuration
      </a>
    ),
    key: '1',
    icon: <UserOutlined />
  },
  {
    type: 'divider',
  },
  {
    label: 'Sign out',
    key: '3',
    icon: <UserOutlined />
  },
];

const { Header, Sider, Content } = Layout;


const AppLayout2: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div>
            <p>private reservation</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <CalendarOutlined />,
              label: 'Scheduler',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Flottes',
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: 'Instructeurs',
            },
            {
              key: '6',
              icon: <Icon type="airplane"/>,
              label: 'Mes vols',
            },
            {
                key: '7',
                icon: <Icon type="airplane"/>,
                label: 'Membres',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className='header'>
            <div className='left-header'>
                <div className='button-collapse'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        }}
                    />
                </div>
            </div>
            <div className='right-header'>
                <div className='button-profile'>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Mahdi Gueffaz
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            height: "100vh",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default AppLayout2;