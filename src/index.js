import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './App';
import NewIssuerScreen from './containers/NewIssuerScreen';
import NewCertificateScreen from './containers/NewCertificateScreen';
import IssueCertificateScreen from './containers/IssueCertificateScreen';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
          <Route path="/new-issuer" component={NewIssuerScreen} />
          <Route path="/new-certificate" component={NewCertificateScreen} />
          <Route path="/issue-certificate" component={IssueCertificateScreen} />
          <Route path="/" exact={true} component={App} />
      </Switch>
    </BrowserRouter>    
    , document.getElementById('root'));
