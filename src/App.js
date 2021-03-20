import React from 'react';
import { Route } from 'react-router-dom';
import { view as Loading } from './components/loading';
import { view as Login } from './login';
import { view as Home } from './pages';

const App = () => {
  return (
    <>
      <Loading />
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
    </>
  );
};

export default App;