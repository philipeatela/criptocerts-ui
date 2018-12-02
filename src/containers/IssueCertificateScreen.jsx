import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom'
import fs from 'fs';

import AppContainer from '../components/appContainer';
import { Button, Label } from 'reactstrap';
import {
  LabelTextCss,
  SmallButton,
  ButtonsContainer,
  StyledForm,
  FormGroupItem,
  InputItem,
  DescriptionContainer,
  DescriptionInput,
} from '../themes';
import fetchCertificates from '../services/fetchCertificates';
import web3 from '../web3';
import criptocerts from '../criptocerts';
import toHex from '../utils/toHex';
import fetchIssuers from '../services/fetchIssuers';

const StyledLabel = styled(Label)`
  ${LabelTextCss}
`;

const StyledButton = styled(Button)`
  ${SmallButton}
`;

const Message = styled('h4')`
  
`;

export default class IssueCertificateScreen extends Component {
  state = {
    issuingInstitution: '',
    availableCertificates: [],
    receivingAddress: '',
    receivingName: '',
    selectedCertificateId: '',
    message: 'Carregando dados da blockchain...',
    certificates: [],
    issuers: [],
    finishedIssuing: false,
    issuedCertificate: '',
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const certificates = await fetchCertificates();
    const issuers = await fetchIssuers();

    if (issuers) {
      this.setState({
        certificates,
      });
    }

    if (certificates) {
      this.setState({
        issuers,
      });
    }

    const currentIssuer = issuers.filter(issuer => issuer.account === accounts[0]);

    if (currentIssuer[0]) {
      this.setState({
        issuingInstitution: currentIssuer[0].name,
      });
    }

    if (!certificates) {
      this.setState({
        message: `Não foi possível carregar nenhum certificado disponível para o endereço ${accounts[0]}`,
        list: filteredCertificates,
      });
      return;
    }

    const filteredCertificates = certificates.filter(cert => cert.owner === accounts[0]);
    if (filteredCertificates.length) {
      this.setState({
        message: `Selecione o certificado a ser concedido.`,
        availableCertificates: filteredCertificates,
        selectedCertificateId: 1,
      });
    } else {
      this.setState({
        message: `O endereço ${accounts[0]} não possui certificados prontos para serem emitidos!`,
        availableCertificates: filteredCertificates,
      });
    }
  }

  onIssue = async () => {
    const {
      issuingInstitution,
      selectedCertificateId,
      receivingAddress,
      issuers,
      certificates,
      receivingName,
      message,
    } = this.state;

    const accounts = await web3.eth.getAccounts();
    const addr = accounts[0];

    const filteredCertificates = certificates.filter(cert => cert.id === selectedCertificateId);
    const selectedCertificate = filteredCertificates.length > 0 ? filteredCertificates[0] : null;

    if (!selectedCertificate) {
      console.log('Certificado não encontrado');
      return;
    }

    const issuingData = {
      certificateName: selectedCertificate.name,
      certificateDescription: selectedCertificate.description,
      certificateCriteria: selectedCertificate.criteria,
      receivingAddress: receivingAddress,
      receivingName: receivingName,
      issuingAddress: selectedCertificate.issuingInstitutionAddress,
    }

    const stringfiedData = JSON.stringify(issuingData);
    const signature = await web3.eth.personal.sign('0x' + toHex(stringfiedData), addr, "33jseyts");

    this.setState({
      message: 'Aguarde enquanto a transação é processada...'
    });

    await criptocerts.methods.issueCertificate(receivingAddress, selectedCertificateId, signature).send({
      from: accounts[0],
    });

    this.setState({
      finishedIssuing: true,
      issuedCertificate: stringfiedData,
      message: 'Certificado emitido com sucesso!'
    });
  };

  render() {
    const {
      availableCertificates,
      message,
      issuingInstitution,
      finishedIssuing,
      receivingName,
      issuedCertificate
    } = this.state;
    const certificateOptions = availableCertificates
      ? availableCertificates.map(cert => <option key={cert.id}>{`${cert.id} - ${cert.name}`}</option>)
      : null;

    return (
      <AppContainer>
        <Message>{message}</Message>
        <StyledForm>
          {!finishedIssuing && (
            <Fragment>
              <FormGroupItem>
                <StyledLabel>
                  Emissor
                </StyledLabel>
                <InputItem
                  type="text"
                  placeholder="Instituição Emissora"
                  disabled
                  value={issuingInstitution || ''}
                />
              </FormGroupItem>
              <FormGroupItem>
                <StyledLabel>
                  Certificado
                </StyledLabel>
                <InputItem
                  type="select"
                  onChange={event => this.setState({
                    selectedCertificateId: event.target.value
                  })}
                >
                  {certificateOptions}
                </InputItem>
              </FormGroupItem>
              <FormGroupItem>
                <StyledLabel>
                  Endereço do receptor:
                </StyledLabel>
                <InputItem
                  type="text"
                  placeholder="Chave pública do receptor"
                  onChange={event => this.setState({
                    receivingAddress: event.target.value
                  })}
                />
              </FormGroupItem>
              <FormGroupItem>
                <StyledLabel>
                  Nome do receptor:
                </StyledLabel>
                <InputItem
                  type="text"
                  placeholder="Nome do receptor"
                  onChange={event => this.setState({
                    receivingName: event.target.value
                  })}
                />
              </FormGroupItem>
              <ButtonsContainer>
                <StyledButton
                  onClick={this.onIssue}
                >
                  Certificar!
              </StyledButton>
                <Link to="/">
                  <StyledButton>
                    Cancelar
                  </StyledButton>
                </Link>
              </ButtonsContainer>
            </Fragment>
          )}
          {finishedIssuing && (
            <Fragment>
              <FormGroupItem>
                <DescriptionContainer>
                  <StyledLabel>
                    {'Certificado: '}
                  </StyledLabel>
                  <DescriptionInput
                    type="textarea"
                    value={issuedCertificate}
                    onChange={event => this.setState({ issuedCertificate: event.target.value })}
                  />
                </DescriptionContainer>
              </FormGroupItem>
              <ButtonsContainer>
                <Link to="/">
                  <StyledButton>
                    Voltar ao Menu
                  </StyledButton>
                </Link>
              </ButtonsContainer>
            </Fragment>
          )}
        </StyledForm>
      </AppContainer>
    );
  }
}
