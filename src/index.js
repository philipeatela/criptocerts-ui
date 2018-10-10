import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './App';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
          {/* <Route path="/newissuer" component={FormContainer} />                   */}
          <Route path="/" exact={true} component={App} />
      </Switch>
    </BrowserRouter>    
    , document.getElementById('root'));
