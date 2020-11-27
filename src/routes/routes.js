import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const LoadingComponent = Component => props => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const Home = LoadingComponent(lazy(() => import('~modules/Home')));
const NotFound = LoadingComponent(lazy(() => import('~modules/NotFound')));
