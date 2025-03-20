import React from "react";
import AppHeader from "../commun/AppHeader";
import AppFooter from "../commun/AppFooter";
import { Outlet } from "react-router";
import { Breadcrumb, Layout, theme } from 'antd';

const { Content} = Layout;


const AppLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    return (
        <Layout>
            <AppHeader />
            
            <Content style={{ padding: '0 48px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div
                style={{
                    background: colorBgContainer,
                    height: "100vh",
                    padding: 24,
                    borderRadius: borderRadiusLG,
                }}
                >
                <Outlet />
                </div>
            </Content>
            
            <AppFooter />
        </Layout>
    )
};

export default AppLayout;