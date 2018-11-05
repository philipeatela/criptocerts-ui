import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './App';
import NewIssuerScreen from './containers/NewIssuerScreen';
import NewCertificateScreen from './containers/NewCertificateScreen';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
          <Route path="/newissuer" component={NewIssuerScreen} />
          <Route path="/newcertificate" component={NewCertificateScreen} />             
          <Route path="/" exact={true} component={App} />
      </Switch>
    </BrowserRouter>    
    , document.getElementById('root'));
