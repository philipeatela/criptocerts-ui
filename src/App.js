import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import AppContainer from './components/appContainer';
import { Button as BootstrapButton } from 'reactstrap';

const DefaultButton = styled(BootstrapButton)`
  height: 40px;
  width: 200px;
  margin: 10px;
`;

export default class App extends Component {
  render() {
      return (
        <AppContainer>
            <DefaultButton>
              Criar Emissor
            </DefaultButton>
            <DefaultButton>
              Criar Certificação
            </DefaultButton>
            <DefaultButton>
              Emitir Certificado
            </DefaultButton>
            <DefaultButton>
              Sobre
            </DefaultButton>
        </AppContainer>
      );
  }
}
