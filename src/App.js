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
            <Link to="/new-issuer">
              <DefaultButton>
                <LabelText>Criar Emissor</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/view-issuers">
              <DefaultButton>
                <LabelText>Visualizar Emissores</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/new-certificate">
              <DefaultButton>
                <LabelText>Criar Certificação</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/view-certificates">
              <DefaultButton>
                <LabelText>Visualizar Certificados</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/issue-certificate">
              <DefaultButton>
                <LabelText>Emitir Certificado</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/new-issuer">
              <DefaultButton>
                <LabelText>Sobre</LabelText>
              </DefaultButton>
            </Link>
            
        </AppContainer>
      );
  }
}
