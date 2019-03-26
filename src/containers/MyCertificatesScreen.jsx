import React, { Component } from 'react';
import styled from 'react-emotion';

import AppContainer from '../components/appContainer';
import ListRow from '../components/listRow';
import web3 from '../web3';
import fetchCertificates from '../services/fetchCertificates';

const Title = styled('h2')`
  color: white;
  text-decoration: underline;
`;

const Message = styled('h4')`
  color: white;
`;

export default class MyCertificatesScreen extends Component {
  state = {
    list: [],
    message: 'Carregando dados da blockchain...',
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const certificates = await fetchCertificates();

    if (!certificates) {
      this.setState({
        message: `Não foi possível carregar nenhum certificado disponível para o endereço ${accounts[0]}`,
        list: filteredCertificates,
      });
      return;
    }

    const filteredCertificates = certificates.filter(cert => cert.owner === accounts[0]);

    if (filteredCertificates.length) {
      this.setState({
        message: `Visualizando certificados disponíveis para o endereço ${accounts[0]}`,
        list: filteredCertificates.map(cert => `${cert.id} - ${cert.name}`),
      });
    } else {
      this.setState({
        message: `Não há certificados disponíveis para o endereço ${accounts[0]}`,
        list: filteredCertificates.map(cert => `${cert.id} - ${cert.name}`),
      });
    }
  }

  render() {
    const { list, message } = this.state;

    const rows = list ?
      list.map((issuer, index) => <ListRow text={issuer} key={index}/> ) :
      null;

      return (
        <AppContainer>
          <Title>Lista de certificados cadastrados:</Title>
          <Message>{message}</Message>
          {rows}
        </AppContainer>
      );
  }
}
