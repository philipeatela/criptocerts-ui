import React, { Component } from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom'

import AppContainer from './components/appContainer';
import { Button as BootstrapButton } from 'reactstrap';
import { LabelText, LargeButton } from './themes';

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
            <Link to="/newcertificate">
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
