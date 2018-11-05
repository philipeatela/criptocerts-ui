import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import AppContainer from '../components/appContainer';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { LabelTextCss, SmallButton } from '../themes/themes';

const FormGroupItem = styled(FormGroup)`
  padding: 10px;
`;

const InputItem = styled(Input)`
  margin-left: 5px;
`;

const StyledLabel = styled(Label)`
  ${LabelTextCss}
`;

const StyledButton = styled(Button)`
  ${SmallButton}
`;

const DescriptionContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`

const DescriptionInput = styled(InputItem)`
  height: 150px;
  width: 300px;
`;

const ButtonsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin-top: 30px;
  padding: 30px;
  border: 2.5px solid #21271b;
  border-radius: 5px;
`

export default class NewIssuerScreen extends Component {
  render() {
      return (
        <AppContainer>
          <StyledForm>
            <FormGroupItem>
              <StyledLabel>
                {`Endereço ETH: `}
              </StyledLabel>
              <InputItem
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
