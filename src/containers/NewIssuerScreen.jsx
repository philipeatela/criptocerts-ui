import React, { Component } from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom'

import AppContainer from '../components/appContainer';
import { Button, Label } from 'reactstrap';
import {
  LabelTextCss,
  SmallButton,
  DescriptionContainer,
  DescriptionInput,
  ButtonsContainer,
  StyledForm,
  FormGroupItem,
  InputItem
} from '../themes';
import web3 from '../web3';
import criptocerts from '../criptocerts';

const StyledLabel = styled(Label)`
  ${LabelTextCss}
`;

const StyledButton = styled(Button)`
  ${SmallButton}
`;

export default class NewIssuerScreen extends Component {
  state = {
    name: '',
    email: '',
    description: ''
  }

  registerIssuer = async () => {
    const { name, email, description } = this.state;

    const accounts = await web3.eth.getAccounts();

    await criptocerts.methods.addIssuer(name, email, description).send({
      from: accounts[0],
    });
  }

  render() {
      return (
        <AppContainer>
          <StyledForm>
            <FormGroupItem>
              <StyledLabel>
                {`Nome: `}
              </StyledLabel>
              <InputItem
                type="text"
                placeholder="Nome do emissor"
                onChange={event => this.setState({ name: event.target.value })}
              />
            </FormGroupItem>
            <FormGroupItem>
              <StyledLabel>
                {`E-mail: `}
              </StyledLabel>
              <InputItem
                type="email"
                placeholder="E-mail de contato"
                onChange={event => this.setState({ email: event.target.value })}
              />
            </FormGroupItem>
            <FormGroupItem>
              <DescriptionContainer>
                <StyledLabel>
                  {`Descrição: `}
                </StyledLabel>
                <DescriptionInput
                  type="textarea"
                  onChange={event => this.setState({ description: event.target.value })}
                />
              </DescriptionContainer>
            </FormGroupItem>
            <ButtonsContainer>
              <StyledButton
                onClick={this.registerIssuer}
              >
                Cadastrar
              </StyledButton>
              <Link to="/">
                <StyledButton>
                  Cancelar
                </StyledButton>
              </Link>
            </ButtonsContainer> 
          </StyledForm>
        </AppContainer>
      );
  }
}
