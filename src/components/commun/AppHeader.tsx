import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header } = Layout;

const items = Array.from({ length: 1 }).map((_, index) => ({
    key: index + 1,
    // label: `nav ${index + 1}`,
    label: "Private scheduler"
  }));

const AppHeader = () => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <p>Private scheduler</p>
            {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
            /> */}
        </Header>
    );
};

export default AppHeader;