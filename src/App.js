import React, { Component } from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom'

import AppContainer from './components/appContainer';
import { Button as BootstrapButton } from 'reactstrap';
import { LabelText, LargeButton } from './themes';
import web3 from './web3';

const DefaultButton = styled(BootstrapButton)`
  ${LargeButton}
`;

const Message = styled('h2')`
  width: 80%;
  text-align: center;
  color: white;
`;

export default class App extends Component {
  state = {
    accountFound: false,
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      this.setState({ accountFound: true })
    }
  }

  render() {
      const { accountFound } = this.state;
      return (
        <AppContainer>
            <Message>{accountFound ? 'Selecione a opção desejada' : 'Entre em sua conta Ethereum através do Metamask para começar a usar o sistema!'}</Message>
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
            {
              accountFound && (
              <Link to="/view-certificates">
                <DefaultButton>
                  <LabelText>Visualizar Meus Certificados</LabelText>
                </DefaultButton>
              </Link>
              )
            }
            <Link to="/issue-certificate">
              <DefaultButton>
                <LabelText>Emitir Certificado</LabelText>
              </DefaultButton>
            </Link>
            <Link to="/verify-certificate">
              <DefaultButton>
                <LabelText>Verificar Certificado</LabelText>
              </DefaultButton>
            </Link>
        </AppContainer>
      );
  }
}
