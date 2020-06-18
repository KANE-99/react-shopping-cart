import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import Admin from './components/Admin';
import Checkout from './components/Checkout';
import Root from './Root';

import './index.scss';

ReactDOM.render(
  <Root>
    <Router>
      <Route exact path='/admin' component={Admin} />
      <Route eaxct path='/checkout' component={Checkout} />
      <Route exact path='/' component={App} />
    </Router>
  </Root>,
  document.getElementById('root')
);
