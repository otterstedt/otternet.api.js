process.env.NODE_ENV = 'test';


var config = require('config');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Configuration check', () => {

    it('Environment should be in test mode', (done) => {
  
      expect(process.env.NODE_ENV).to.equal('test');
      done();
    });
});