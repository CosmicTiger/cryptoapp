import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../../assets/images/cryptocurrency.png';

const Navbar = () => {
    return (
        <nav className="Navbar">
            <div className="Navbar-logoContainer">
                <Avatar src={icon} size="large" />
                <Typography.Title level={3} className="Navbar-logo">
                    <Link to="/">Cryptoverse</Link>
                </Typography.Title>
                {/* <Button className="Navbar-menuControlContainer">

                </Button> */}
            </div>
            <Menu theme="dark">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FundOutlined />}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<MoneyCollectOutlined />}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<BulbOutlined />}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
        </nav>
    )
}


export default Navbar
