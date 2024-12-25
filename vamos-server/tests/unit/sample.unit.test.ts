import { expect } from 'chai';
import sinon from 'sinon';
import { myFunction } from '../../src/controllers/sampleController';

describe('Sample Controller - myFunction', () => {
  it('should return the correct result', () => {
    const result = myFunction(5);
    expect(result).to.equal(25);
  });

  it('should call anotherFunction once', () => {
    const anotherFunction = sinon.stub().returns(10);
    const result = myFunction(5, anotherFunction);
    expect(anotherFunction.calledOnce).to.be.true;
    expect(result).to.equal(50);
  });
});