import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom'
import Modal from 'react-modal';

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

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#a4a38e',
    width: '30%',
    height: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
};

const StyledInput = styled(InputItem)`
  margin-bottom: 5%;
`;

const StyledLabel = styled(Label)`
  ${LabelTextCss}
`;

const StyledButton = styled(Button)`
  ${SmallButton}
`;

const Message = styled('h4')`
  
`;

Modal.setAppElement(document.getElementById('root'));

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
    showModal: false,
    password: '',
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  afterOpenModal = () => {

  }

  closeModal = () => {
    this.setState({ showModal: false });
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
      password,
    } = this.state;

    this.closeModal();

    const accounts = await web3.eth.getAccounts();
    const addr = accounts[0];

    const filteredCertificates = certificates.filter(cert => cert.id === selectedCertificateId);
    const selectedCertificate = filteredCertificates.length > 0 ? filteredCertificates[0] : null;

    if (!selectedCertificate) {
      console.log('Certificado não encontrado');
      return;
    }

    const totalIssuedCertificates = await criptocerts.methods.getIssuedCertsCount().call();
    const issuingId = totalIssuedCertificates;

    const issuingData = {
      certificateName: selectedCertificate.name,
      certificateDescription: selectedCertificate.description,
      certificateCriteria: selectedCertificate.criteria,
      receivingAddress: receivingAddress,
      receivingName: receivingName,
      issuingAddress: addr,
      issuingId: issuingId,
    }

    const stringfiedData = JSON.stringify(issuingData);
    const signature = await web3.eth.personal.sign('0x' + toHex(stringfiedData), addr, password);

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

  _renderModal = () => {
    const { showModal } = this.state;

    return (
      <Modal
        isOpen={showModal}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Confirmação"
        style={customStyles}
      >
        <h4>Favor preencher sua senha para desbloquear a conta!</h4>
        <StyledInput
          type="password"
          placeholder="Senha"
          onChange={event => this.setState({
            password: event.target.value
          })}
        />
        <StyledButton
          onClick={this.onIssue}
        >
          Confirmar
        </StyledButton>
      </Modal>
    );
  }

  render() {
    const {
      availableCertificates,
      message,
      issuingInstitution,
      finishedIssuing,
      receivingName,
      issuedCertificate,
      selectedCertificateId,
      receivingAddress
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
                    selectedCertificateId: parseInt(event.target.value.charAt(0))
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
                  onClick={this.openModal}
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
        {this._renderModal()}
      </AppContainer>
    );
  }
}
