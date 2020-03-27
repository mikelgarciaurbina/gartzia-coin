import Elliptic from 'elliptic';
import hash from './hash';

const ec = new Elliptic.ec('secp256k1'); // eslint-disable-line

export default {
  createKeyPair: () => ec.genKeyPair(),

  veriifySignature: (publicKey, signature, data) => ec.keyFromPublic(publicKey, 'hex').verify(hash(data), signature),
};
