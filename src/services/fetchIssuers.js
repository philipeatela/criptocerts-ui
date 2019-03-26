import criptocerts from '../criptocerts';

export default async () => {
  const numberOfIssuers = await criptocerts.methods.getIssuerCount().call();

  const issuers = [];
  let name;
  let email;
  let description;
  let account;

  for(let i = 0; i < numberOfIssuers;i++) {
    let id = i + 1;
    const result = await criptocerts.methods.getIssuer(id).call();

    name = result[0];
    email = result[1];
    description = result[2];
    account = result[3];

    let issuer = {
      name: name,
      email: email,
      description: description,
      account: account,
    };

    issuers.push(issuer);
  }

  return issuers;
}
