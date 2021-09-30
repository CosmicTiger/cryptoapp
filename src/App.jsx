import React from 'react';
import { Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

const App = () => {
  return (
    <div className="App">
      <header className="Header">
        <Navbar />
      </header>
      <main className="Main">
        <Layout />
        <footer className="Footer">
          <Typography.Title
            level={5}
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </footer>
      </main>
    </div>
  );
}

export default App;
