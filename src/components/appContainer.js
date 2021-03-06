import React, { Component } from 'react';
import styled from 'react-emotion';
import { TitleText, colors } from '../themes';

const PageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 110vh;
  overflow: auto;
`
const HeaderRow = styled('div')`
  background-color: ${colors.green};
  width: 100%;
  padding: 20px 0px;
  text-align: center;
`
const BodyRow = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.brown};  
  padding-top: 5px;
  width: 100%;
  height: 100%;
`

export default class AppContainer extends Component {
  render() {
    return (
      <PageContainer>
        <HeaderRow>
          <TitleText>
            Bem Vindo ao Criptocerts!
          </TitleText>
        </HeaderRow>
        <BodyRow>
          {this.props.children}
        </BodyRow>
      </PageContainer>
    );
  }
}
