import React, { Component } from 'react';
import styled from 'react-emotion';

import AppContainer from '../components/appContainer';
import ListRow from '../components/listRow';
import criptocerts from '../criptocerts';
import fetchIssuers from '../services/fetchIssuers';

const Title = styled('h2')`
  color: white;
  text-decoration: underline;
`;

const Message = styled('h4')`
  color: white;
`;

export default class ViewIssuersScreen extends Component {
  state = {
    list: [],
    message: 'Carregando dados da blockchain...',
  }

  async componentDidMount() {
    // const numberOfIssuers = await criptocerts.methods.getIssuerCount().call();

    // const issuers = [];
    // let issuer;

    // for(let i = 0; i < numberOfIssuers;i++) {
    //   let id = i + 1;
    //   issuer = await criptocerts.methods.getIssuer(id).call();
    //   issuers.push(issuer);
    // }

    const issuers = await fetchIssuers();

    console.log(issuers);

    if (issuers.length) {
      this.setState({
        message: `Visualizando os emissores cadastrados no Criptocerts.`,
        list: issuers.map(issuer => issuer.name),
      });
    } else {
      this.setState({
        message: `Ainda não há emissores cadastrados no sistema!`,
        list: issuers.map(issuer => issuer.name),
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
          <Message>{message}</Message>
          {(list.length > 0) && (
              <Title>Lista de emissores cadastrados:</Title>
            )}
          {rows}
        </AppContainer>
      );
  }
}
