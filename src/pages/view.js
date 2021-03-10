import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { view as Header } from '../components/header';
import { view as Sidebar } from '../components/sidebar';
import { view as Topo } from './topo';
import { view as test } from './test';
import { view as hospital } from './hospital';
import { view as supermarket } from './supermarket';
import styles from './home.module.css';

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;
  const sidebarStyle = {
    flex: '0 0 ' + sidebarWidth + 'px',
    width: sidebarWidth + 'px'
  };

  return (
    <div className="ant-layout ant-layout-has-sider">
      <div style={sidebarStyle} className="ant-layout-sider ant-layout-sider-dark">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className={`${styles['content-wrapper']} ant-layout`}>
        <div className={`${styles.header} ant-layout-header`}>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        <div className={`${styles.content} ant-layout-content`}>
          <Route path="/home/topo" component={Topo} />
          <Route path="/home/hospital" component={hospital} />
          <Route path="/home/supermarket" component={supermarket} />
          <Route path="/home/test" component={test} />

      
        </div>
      </div>
    </div>
  );
};

export default HomePage;