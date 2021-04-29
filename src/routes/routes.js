import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PATH from './path';

const LoadingComponent = Component => props => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);
const Home = LoadingComponent(lazy(() => import('~modules/Home')));
const NotFound = LoadingComponent(lazy(() => import('~modules/NotFound')));

const routes = () => (
  <Switch>
    <Route path={PATH.HOME} exact render={Home} />
    <Route path={PATH.ERROR} render={NotFound} />
    <Route path="*">
      <Redirect to={PATH.ERROR} />
    </Route>
  </Switch>
);

export default routes;
