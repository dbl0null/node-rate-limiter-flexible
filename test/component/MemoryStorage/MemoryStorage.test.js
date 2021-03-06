const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const MemoryStorage = require('../../../lib/component/MemoryStorage/MemoryStorage');

describe('MemoryStorage', function () {
  const testKey = 'test';
  const val = 34;
  let storage;

  this.timeout(5000);

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it('should set and get', (done) => {
    storage.set(testKey, val, 5);
    expect(storage.get(testKey).consumedPoints).to.equal(val);
    done();
  });

  it('should delete record on expire', (done) => {
    storage.set(testKey, val, 1);
    setTimeout(() => {
      expect(storage.get(testKey)).to.equal(null);
      done();
    }, 2000);
  });

  it('should incrby', (done) => {
    storage.set(testKey, val, 5);
    storage.incrby(testKey, 2);
    expect(storage.get(testKey).consumedPoints).to.equal(val + 2);
    done();
  });

  it('incrby should create record if it is not set', (done) => {
    storage.incrby(testKey, val, 5);
    expect(storage.get(testKey).consumedPoints).to.equal(val);
    done();
  });

  it('should delete record and return true, if it was there', () => {
    storage.set(testKey, val, 10);
    expect(storage.delete(testKey)).to.equal(true);
    expect(storage.get(testKey)).to.equal(null);
  });

  it('return false, if there is no record to delete', () => {
    expect(storage.delete(testKey)).to.equal(false);
  });
});
