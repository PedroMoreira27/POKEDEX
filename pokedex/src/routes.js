import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import home from './home';
import Pokemon from './pokemon';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={home} path="/" exact />
      <Route component={Pokemon} path="/pokemon/:name" />{' '}
      {/* Route with parameter */}
    </BrowserRouter>
  );
};

export default Routes;
