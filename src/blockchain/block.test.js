import Block from './block';

describe('Block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;
  let nonce;

  beforeEach(() => {
    timestamp = new Date(2010, 0, 1);
    previousBlock = Block.genesis;
    data = 't35t-d4t4';
    hash = 'h45h';
    nonce = 128;
  });

  it('create an instance with parameters', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data, nonce);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
    expect(block.nonce).toEqual(nonce);
  });

  it('use static mine()', () => {
    const block = Block.mine(previousBlock, data);
    const { difficulty } = block;

    expect(block.hash.length).toEqual(64);
    expect(block.hash.substring(0, difficulty)).toEqual('0'.repeat(difficulty));
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.nonce).not.toEqual(0);
    expect(block.data).toEqual(data);
  });

  it('use statuc hash()', () => {
    hash = Block.hash(timestamp, previousBlock.hash, data, nonce);
    const hashOutput = 'a4a079e51e3ae2658ccc5b3046637e21c4320afdd2ad0c98c3ef7d88abd4a2d8';

    expect(hash).toEqual(hashOutput);
  });

  it('use toString()', () => {
    const block = Block.mine(previousBlock);

    expect(typeof block.toString()).toEqual('string');
  });
});
