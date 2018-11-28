import React, { Component } from 'react';
import styled from 'react-emotion';

import AppContainer from '../components/appContainer';
import ListRow from '../components/listRow';
import criptocerts from '../criptocerts';

const Title = styled('h2')`
  color: white;
  text-decoration: underline;
`;

export default class MyCertificatesScreen extends Component {
  state = {
    list: [],
  }

  async componentDidMount() {
    const numberOfCertificates = await criptocerts.methods.getCertificateCount().call();

    const certificates = [];
    let certificate;

    console.log(numberOfCertificates);

    for(let i = 0; i < numberOfCertificates;i++) {
      let id = i + 1;
      certificate = await criptocerts.methods.getCertificate(id).call();
      certificates.push(certificate);
    }

    this.setState({ list: certificates });
  }

  render() {
    const { list } = this.state;

    const rows = list ?
      list.map((issuer, index) => <ListRow text={issuer} key={index}/> ) :
      null;

      return (
        <AppContainer>
          <Title>Lista de certificados cadastrados:</Title>
          {rows || 'Carregando...' }
        </AppContainer>
      );
  }
}
