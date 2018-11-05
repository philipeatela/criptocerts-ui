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

const StyledLabel = styled(Label)`
  ${LabelTextCss}
`;

const StyledButton = styled(Button)`
  ${SmallButton}
`;

export default class NewIssuerScreen extends Component {
  render() {
      return (
        <AppContainer>
          <StyledForm>
            <FormGroupItem>
              <StyledLabel>
                {`Endereço ETH: `}
              </StyledLabel>
              <InputItem //@TODO Disable this input. Eth address is fixed
                type="text"
                placeholder="XXXXXXXXXXX"
              />
            </FormGroupItem>
            <FormGroupItem>
              <StyledLabel>
                {`Nome: `}
              </StyledLabel>
              <InputItem
                type="text"
                placeholder="Nome do emissor"
              />
            </FormGroupItem>
            <FormGroupItem>
              <StyledLabel>
                {`E-mail: `}
              </StyledLabel>
              <InputItem
                type="email"
                placeholder="E-mail de contato"
              />
            </FormGroupItem>
            <FormGroupItem>
              <DescriptionContainer>
                <StyledLabel>
                  {`Descrição: `}
                </StyledLabel>
                <DescriptionInput
                  type="textarea"
                />
              </DescriptionContainer>
            </FormGroupItem>
            <ButtonsContainer>
              <StyledButton>
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
