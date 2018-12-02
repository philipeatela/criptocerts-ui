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

const StyledButton = styled(Button)`
  ${SmallButton};
`;

export default class NewCertificateScreen extends Component {
  state = {
    name: '',
    description: '',
    criteria: '',
  };

  registerCertificate = async () => {
    const { name, description, criteria } = this.state;

    const accounts = await web3.eth.getAccounts();

    // check if registered issuer before adding cert

    await criptocerts.methods.addCertificate(name, description, criteria).send({
      from: accounts[0],
    });
  }

  render() {
      return (
        <AppContainer>
          <StyledForm>
            <FormGroupItem>
              <StyledLabel>
                {'Nome: '}
              </StyledLabel>
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
                <StyledLabel>
                  {'Critérios: '}
                </StyledLabel>
                <DescriptionInput
                  type="textarea"
                  onChange={event => this.setState({ criteria: event.target.value })}
                />
              </DescriptionContainer>
            </FormGroupItem>
            <ButtonsContainer>
              <StyledButton
                onClick={this.registerCertificate}
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
