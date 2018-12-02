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
  InputItem,
  DescriptionContainer,
  DescriptionInput,
} from '../themes';
import criptocerts from '../criptocerts';
import fetchIssuedCerts from '../services/fetchIssuedCerts';
import fetchCertificates from '../services/fetchCertificates';
import web3 from '../web3';

const StyledLabel = styled(Label)`
  ${LabelTextCss}
`;

const StyledButton = styled(Button)`
  ${SmallButton}
`;

const Message = styled('h4')`
  
`;

export default class VerifyCertificateScreen extends Component {
  state = {
    certData: '',
    verifyAttempted: false,
    message: '',
    verificationResult: '',
  }

  async componentDidMount() {
    const issuedCerts = await fetchIssuedCerts();
    const certs = await fetchCertificates();
    const cert = certs[0];
    const issuedCert = issuedCerts[0];
    console.log(cert);
  }

  onVerify = async () => {
    this.setState({
      message: 'Aguarde enquanto o certificado inserido é validado...'
    });

    const { certData, verifyAttempted } = this.state;
    const issuedCerts = await fetchIssuedCerts();
    const accounts = await web3.eth.getAccounts();

    const certs = await fetchCertificates();
    const cert = certs[0];
    // const data = {
    //   name: cert.name,
    //   description: cert.description,
    //   criteria: cert.criteria,
    // }

    const stringfied = JSON.stringify(cert);

    const stringToValidate = `\x19Ethereum Signed Message:\n${stringfied.length}${stringfied}`;
    const insertedDataHash = web3.utils.sha3(stringToValidate);

    const issuedCert = issuedCerts[0];
    const ds = issuedCert.digitalSignature;

    const signature = ds.substr(2); //remove 0x
    const r = '0x' + signature.slice(0, 64);
    const s = '0x' + signature.slice(64, 128);
    const v = '0x' + signature.slice(128, 130);
    const v_decimal = web3.utils.hexToNumber(v);

    const signingAddr = await criptocerts.methods.recoverAddr(insertedDataHash, v_decimal, r, s).call();
    const sucess = await criptocerts.methods.isSigned(accounts[0], insertedDataHash, v_decimal, r, s).call();
    console.log(signingAddr);
    console.log(sucess);

    const responseMsg = sucess
      ? `O certificado inserido é válido e foi emitido pelo endereço ${signingAddr}.`
      : 'O certififcado inserido é inválido!';

    this.setState({
      message: 'Verificação completa com sucesso!',
      verificationResult: responseMsg,
      verifyAttempted: true,
    });

    //FOR SIGNATURE Hex:
    // I really did make this message

    //FOR VALIDATOR sha3:
    // \x19Ethereum Signed Message:\n30I really did make this message


  };

  _renderBeforeVerify() {
    return (
      <React.Fragment>
        <FormGroupItem>
          <DescriptionContainer>
            <StyledLabel>
              {'Dados do certificado: '}
            </StyledLabel>
            <DescriptionInput
              type="textarea"
              onChange={event => this.setState({ certData: event.target.value })}
            />
          </DescriptionContainer>
        </FormGroupItem>
        <ButtonsContainer>
          <StyledButton
            onClick={this.onVerify}
          >
            Verificar!
          </StyledButton>
          <Link to="/">
            <StyledButton>
              Cancelar
            </StyledButton>
          </Link>
        </ButtonsContainer>
      </React.Fragment>
    );
  }

  _renderAfterVerify() {
    const { verificationResult } = this.state;
    return (
      <React.Fragment>
        {verificationResult}
        <ButtonsContainer>
          <Link to="/">
            <StyledButton>
              Voltar ao menu principal
            </StyledButton>
          </Link>
        </ButtonsContainer>
      </React.Fragment>
    );
  }

  render() {
    const { verifyAttempted, message } = this.state;
    return (
      <AppContainer>
        <Message>{message}</Message>
        <StyledForm>
          {verifyAttempted ? this._renderAfterVerify() : this._renderBeforeVerify()}
        </StyledForm>
      </AppContainer>
    );
  }
}
