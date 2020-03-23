import Block from './block';

describe('Block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;

  beforeEach(() => {
    timestamp = new Date(2010, 0, 1);
    previousBlock = Block.genesis;
    data = 't35t-d4t4';
    hash = 'h45h';
  });

  it('create an instance with parameters', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
  });

  it('use static mine()', () => {
    const block = Block.mine(previousBlock, data);

    expect(block.hash.length).toEqual(64);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
  });

  it('use statuc hash()', () => {
    hash = Block.hash(timestamp, previousBlock.hash, data);
    const hashOutput = 'cb60e81b26d792e798de6ce7d4fdda96ee0485a7beff357691084096d69caae9';

    expect(hash).toEqual(hashOutput);
  });

  it('use toString()', () => {
    const block = Block.mine(previousBlock);

    expect(typeof block.toString()).toEqual('string');
  });
});
