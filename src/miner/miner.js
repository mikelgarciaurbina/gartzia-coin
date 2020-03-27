class Miner {
  constructor(blockchain, p2pService, wallet) {
    this.blockchain = blockchain;
    this.p2pService = p2pService;
    this.wallet = wallet;
  }

  mine() {
    const {
      blockchain: { memoryPool },
    } = this;
  }
}

export default Miner;
