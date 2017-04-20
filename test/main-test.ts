import { expect } from 'chai';

function hello() {
    return 'Hello World!';
}

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = hello();
    expect(result).to.equal('Hello World!');
  });
});