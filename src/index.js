import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';

const history = createBrowserHistory();

const App = () => (
  <>
    <Router history={history}>
      <Routes />
    </Router>
  </>
);

ReactDOM.render(<App />, document.getElementById('app'));
