import criptocerts from '../criptocerts';

export default async (address) => {
  const result = await criptocerts.methods.isUserIssuer(address).call();
  return result;
}
