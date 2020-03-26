import uuidV1 from 'uuid/v1';
import { elliptic } from '../modules';

class Transaction {
  constructor() {
    this.id = uuidV1();
    this.input = null;
    this.outputs = [];
  }

  static create(senderWallet, recipientAdress, amount) {
    const { balance, publicKey } = senderWallet;

    if (amount > balance) throw Error(`Amount: ${amount} exceeds balance.`);

    const transaction = new Transaction();
    transaction.outputs.push(...[
      { amount: balance - amount, address: publicKey },
      { amount, address: recipientAdress },
    ]);

    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(transaction.outputs),
    };

    return transaction;
  }

  static verify(transaction) {
    const { input: { address, signature }, outputs } = transaction;

    return elliptic.veriifySignature(address, signature, outputs);
  }
}

export default Transaction;
