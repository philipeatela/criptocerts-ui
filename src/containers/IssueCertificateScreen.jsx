import React, { Component } from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom'

import AppContainer from '../components/appContainer';
import { Button, Label } from 'reactstrap';
import {
  LabelTextCss,
  SmallButton,
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

export default class IssueCertificateScreen extends Component {
  render() {
      return (
        <AppContainer>
          <StyledForm>
            <FormGroupItem>
              <StyledLabel>
                Emissor
              </StyledLabel>
              <InputItem
                type="text"
                placeholder="Instituição Emissora"
              />
            </FormGroupItem>
            <FormGroupItem>
              <StyledLabel>
                Certificado
              </StyledLabel>
              <InputItem type="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </InputItem>
            </FormGroupItem>
            <FormGroupItem>
              <StyledLabel>
                Endereço do receptor:
              </StyledLabel>
              <InputItem
                type="text"
                placeholder="Chave pública do receptor"
              />
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
