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
import web3 from '../web3';
import fetchCertificateById from '../services/fetchCertificateById';

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

  onVerify = async () => {
    this.setState({
      message: 'Aguarde enquanto o certificado inserido é validado...'
    });

    const { certData } = this.state;
    const issuedCerts = await fetchIssuedCerts();

    if (!issuedCerts) {
      this.setState({
        message: 'Não foram encontrados certificados emitidos!'
      });
      return;
    }
    const certObj = JSON.parse(certData);

    const stringToValidate = `\x19Ethereum Signed Message:\n${certData.length}${certData}`;
    const insertedDataHash = web3.utils.sha3(stringToValidate);

    const issuedCert = issuedCerts[certObj.issuingId];
    const ds = issuedCert.digitalSignature;
    const certId = issuedCert.certId;
    const certInfo = await fetchCertificateById(certId);

    const signature = ds.substr(2); //remove 0x
    const r = '0x' + signature.slice(0, 64);
    const s = '0x' + signature.slice(64, 128);
    const v = '0x' + signature.slice(128, 130);
    const v_decimal = web3.utils.hexToNumber(v);

    const signingAddr = await criptocerts.methods.recoverAddr(insertedDataHash, v_decimal, r, s).call();
    const sucess = await criptocerts.methods.isSigned(certInfo.owner, insertedDataHash, v_decimal, r, s).call();

    const responseMsg = sucess
      ? `O certificado inserido é válido e foi emitido pelo endereço ${signingAddr}.`
      : 'O certififcado inserido é inválido!';

    this.setState({
      message: 'Verificação completa com sucesso!',
      verificationResult: responseMsg,
      verifyAttempted: true,
    });
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
