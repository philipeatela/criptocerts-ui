import criptocerts from '../criptocerts';

export default async () => {
  const numberOfIssuedCerts = await criptocerts.methods.getIssuedCertsCount().call();

  const issuedCerts = [];
  let certId;
  let issuingAddress;
  let recipientAddress;
  let digitalSignature;

  for(let i = 0; i < numberOfIssuedCerts;i++) {
    let id = i + 1;
    const result = await criptocerts.methods.getIssuedCerts(id).call();

    certId = result[0];
    issuingAddress = result[1];
    recipientAddress = result[2];
    digitalSignature = result[3];

    let issuedCert = {
      certId: certId,
      issuingAddress: issuingAddress,
      recipientAddress: recipientAddress,
      digitalSignature: digitalSignature,
    };

    issuedCerts.push(issuedCert);
  }

  return issuedCerts;
}
