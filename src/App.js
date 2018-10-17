import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import AppContainer from './components/appContainer';
import { Button as BootstrapButton } from 'reactstrap';
import { LabelText, LargeButton } from './themes/themes';

const DefaultButton = styled(BootstrapButton)`
  ${LargeButton}
`;

export default class App extends Component {
  render() {
      return (
        <AppContainer>
            <Link to="/newissuer">
              <DefaultButton>
                <LabelText>Criar Emissor</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/newissuer">
              <DefaultButton>
                <LabelText>Criar Certificação</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/newissuer">
              <DefaultButton>
                <LabelText>Emitir Certificado</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/newissuer">
              <DefaultButton>
                <LabelText>Sobre</LabelText>
              </DefaultButton>
            </Link>
            
        </AppContainer>
      );
  }
}
