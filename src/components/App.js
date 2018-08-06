import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import Button from './button';
import ButtonList from './buttonList';
import AppContainer from './appContainer';

const buttonWidth = "70%";
const buttonHeight = "15%";

export default class App extends Component {
  render() {
      return (
        <AppContainer>   
          <ButtonList
            width="100%"
            height="100%"
          >
            <Button
              buttonText="Create Issuer"
              height={buttonHeight}
              width={buttonWidth}
            />
            <Button
              buttonText="New Certificate"
              height={buttonHeight}
              width={buttonWidth}
            />
            <Button
              buttonText="Issue Certificate"
              height={buttonHeight}
              width={buttonWidth}
            />
            <Button
              buttonText="About"
              height={buttonHeight}
              width={buttonWidth}
            />
          </ButtonList>
        </AppContainer>
      );
  }
}
