import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './components/App';
import reducers from './reducers';
import FormContainer from './components/formContainer';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/newissuer" component={FormContainer} />            
        </Switch>
      </BrowserRouter>    
    </Provider>    
    , document.getElementById('root'));
registerServiceWorker();
