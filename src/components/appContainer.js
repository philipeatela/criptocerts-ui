import React, { Component } from 'react';
import styled from 'react-emotion';
import logo from '../logo.svg';
import { Container, Row, Col } from 'reactstrap';

const PageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
`
const HeaderRow = styled('div')`
  background-color: #880B0D;
  width: 100%;
  padding: 20px;
  color: white;
  text-align: center;
`
const BodyRow = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #D5C6C6;  
  padding-top: 5px;
  width: 100%;
  height: 100%;
`
const AppTitle = styled('h1')`
  font-size: 32px;
`

export default class AppContainer extends Component {
  render() {
    return (
      <PageContainer>
        <HeaderRow>
          <AppTitle>
            Bem Vindo ao Criptocerts!
          </AppTitle>
        </HeaderRow>
        <BodyRow>
          {this.props.children}
        </BodyRow>
      </PageContainer>
    );
  }
}
