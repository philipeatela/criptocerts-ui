import criptocerts from '../criptocerts';

export default async () => {
  const numberOfCertificates = await criptocerts.methods.getCertificateCount().call();

  const certificates = [];
  let name;
  let description;
  let criteria;
  let owner;

  for(let i = 0;i < numberOfCertificates;i++) {
    let id = i + 1;
    const result = await criptocerts.methods.getCertificate(id).call();

    name = result[0];
    description = result[1];
    criteria = result[2];
    owner = result[3];

    let certificateInfo = {
      id: id,
      name: name,
      description: description,
      criteria: criteria,
      owner: owner.toString(),
    }

    certificates.push(certificateInfo);
  }

  return certificates;
}
