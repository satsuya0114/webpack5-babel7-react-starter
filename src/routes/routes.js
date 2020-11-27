import React, { Suspense, lazy, Children } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PATH from './path';

const LoadingComponent = Component => props => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);
const RouteNotFound = () => (
  <Redirect to={{ state: { notFound: true } }} />
);

// eslint-disable-next-line max-len
const RootRoute = withRouter(({ location, children }) => (location?.state?.notFound ? <NotFound /> : children));

const Home = LoadingComponent(lazy(() => import('~modules/Home')));
const NotFound = LoadingComponent(lazy(() => import('~modules/NotFound')));

const routes = () => (
  <Switch>
    <Route path={PATH.HOME} exact render={Home} />
    <Route path={PATH.ERROR} render={NotFound} />
    <Redirect from="*" to={PATH.ERROR} />
  </Switch>
  // <RootRoute>
  // </RootRoute>
);

export default routes;
