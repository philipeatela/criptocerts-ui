import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './App';
import NewIssuerScreen from './containers/NewIssuerScreen';
import NewCertificateScreen from './containers/NewCertificateScreen';
import IssueCertificateScreen from './containers/IssueCertificateScreen';
import ViewIssuersScreen from './containers/ViewIssuersScreen';
import MyCertificatesScreen from './containers/MyCertificatesScreen';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
          <Route path="/new-issuer" component={NewIssuerScreen} />
          <Route path="/view-issuers" component={ViewIssuersScreen} />
          <Route path="/new-certificate" component={NewCertificateScreen} />
          <Route path="/view-certificates" component={MyCertificatesScreen} />
          <Route path="/issue-certificate" component={IssueCertificateScreen} />
          <Route path="/" exact={true} component={App} />
      </Switch>
    </BrowserRouter>    
    , document.getElementById('root'));
