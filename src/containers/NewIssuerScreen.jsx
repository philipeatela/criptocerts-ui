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
import checkIssuerById from '../services/checkIssuerById';

const StyledLabel = styled(Label)`
  ${LabelTextCss}
`;

const ExtraMarginLabel = styled(StyledLabel)`
  margin-right: 25px;
`

const StyledButton = styled(Button)`
  ${SmallButton}
`;

export default class NewIssuerScreen extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    message: 'Preencha os dados para se cadastrar como emissor no Criptocerts.',
    isIssuer: false,
  }

  registerIssuer = async () => {
    const { name, email, description } = this.state;

    this.setState({
      message: 'Aguarde enquanto o cadastro é processado...'
    });

    const accounts = await web3.eth.getAccounts();

    await criptocerts.methods.addIssuer(name, email, description).send({
      from: accounts[0],
    });

    this.setState({
      message: 'Seu endereço foi registrado como um emissor de criptocerts!'
    });
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();

    if (!accounts[0]) {
      this.setState({
        message: 'Nenhuma conta Ethereum detectada, favor autenticar via Metamask.'
      });
      return;
    }

    const isIssuer = await criptocerts.methods.isIssuer(accounts[0]).call();

    if (isIssuer) {
      this.setState({
        message: 'Essa conta já é um emissor de criptocerts!',
        isIssuer: true,
      });
    }
  }

  render() {
    const { message, isIssuer } = this.state;
    return (
      <AppContainer>
        <h4>{message}</h4>
        <StyledForm>
          <FormGroupItem>
            <ExtraMarginLabel>
              {`Nome: `}
            </ExtraMarginLabel>
            <InputItem
              type="text"
              placeholder="Nome do emissor"
              onChange={event => this.setState({ name: event.target.value })}
            />
          </FormGroupItem>
          <FormGroupItem>
            <ExtraMarginLabel>
              {`E-mail: `}
            </ExtraMarginLabel>
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
              disabled={isIssuer}
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
