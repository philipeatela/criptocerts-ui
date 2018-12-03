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
  ${LabelTextCss};
`;

const NameLabel = styled(StyledLabel)`
  margin-right: 26.5px;
`;

const CriteriaLabel = styled(StyledLabel)`
  margin-right: 13px;
`;

const StyledButton = styled(Button)`
  ${SmallButton};
`;

export default class NewCertificateScreen extends Component {
  state = {
    name: '',
    description: '',
    criteria: '',
    message: 'Carregando dados da blockchain...',
    isIssuer: false,
  };

  registerCertificate = async () => {
    const { name, description, criteria } = this.state;

    this.setState({
      message: 'Aguarde enquanto o novo certificado é salvo...'
    });

    const accounts = await web3.eth.getAccounts();

    await criptocerts.methods.addCertificate(name, description, criteria).send({
      from: accounts[0],
    });

    this.setState({
      message: 'Certificado criado com sucesso!'
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
        message: 'Preencha os dados do novo certificado abaixo.',
        isIssuer: true,
      });
    } else {
      this.setState({
        message: 'Esta conta ainda não é um emissor de criptocerts! Favor registrar-se antes.',
        isIssuer: false,
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
            <NameLabel>
              {'Nome: '}
            </NameLabel>
            <InputItem
              type="text"
              placeholder="Nome do certificado"
              onChange={event => this.setState({ name: event.target.value })}
            />
          </FormGroupItem>
          <FormGroupItem>
            <DescriptionContainer>
              <StyledLabel>
                {'Descrição: '}
              </StyledLabel>
              <DescriptionInput
                type="textarea"
                onChange={event => this.setState({ description: event.target.value })}
              />
            </DescriptionContainer>
          </FormGroupItem>
          <FormGroupItem>
            <DescriptionContainer>
              <CriteriaLabel>
                {'Critérios: '}
              </CriteriaLabel>
              <DescriptionInput
                type="textarea"
                onChange={event => this.setState({ criteria: event.target.value })}
              />
            </DescriptionContainer>
          </FormGroupItem>
          <ButtonsContainer>
            <StyledButton
              onClick={this.registerCertificate}
              disabled={!isIssuer}
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
