import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Counter from './components/counter';
import Setup from './components/setup';
import Seats from './components/seats';
import Summary from './components/summary';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';

import 'antd/dist/antd.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className='layout'>
        <Header></Header>
        <Content>
          <Route path='/' exact component={Setup} />
          <Route path='/seats' exact component={Seats} />
          <Route path='/summary' exact component={Summary} />
        </Content>
        <Footer></Footer>
      </Layout>
    </BrowserRouter>

  );
}

export default App;
