import criptocerts from '../criptocerts';

export default async (id) => {
  const result = await criptocerts.methods.getCertificate(id).call();

  const name = result[0];
  const description = result[1];
  const criteria = result[2];
  const owner = result[3];

  const certificateInfo = {
    id: id,
    name: name,
    description: description,
    criteria: criteria,
    owner: owner.toString(),
  }

  return certificateInfo;
}
