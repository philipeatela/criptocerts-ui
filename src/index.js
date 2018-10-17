import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './App';
import NewIssuerScreen from './containers/NewIssuerScreen';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
          <Route path="/newissuer" component={NewIssuerScreen} />                  
          <Route path="/" exact={true} component={App} />
      </Switch>
    </BrowserRouter>    
    , document.getElementById('root'));
