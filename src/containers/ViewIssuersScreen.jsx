import React, { Component } from 'react';
import styled from 'react-emotion';

import AppContainer from '../components/appContainer';
import ListRow from '../components/listRow';
import criptocerts from '../criptocerts';

const Title = styled('h2')`
  color: white;
  text-decoration: underline;
`;

export default class ViewIssuersScreen extends Component {
  state = {
    list: [],
  }

  async componentDidMount() {
    const numberOfIssuers = await criptocerts.methods.getIssuerCount().call();

    const issuers = [];
    let issuer;

    for(let i = 0; i < numberOfIssuers;i++) {
      let id = i + 1;
      issuer = await criptocerts.methods.getIssuer(id).call();
      issuers.push(issuer);
    }

    console.log(numberOfIssuers);

    this.setState({ list: issuers });
  }

  render() {
    const { list } = this.state;

    const rows = list ?
      list.map((issuer, index) => <ListRow text={issuer} key={index}/> ) :
      null;

      return (
        <AppContainer>
          <Title>Lista de emissores cadastrados:</Title>
          {rows || 'Carregando...' }
        </AppContainer>
      );
  }
}
