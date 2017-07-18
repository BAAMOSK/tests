const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const tee = new User({ name: "Tee" });

    tee.save()
      .then(() => {
        assert(!tee.isNew);
        done();
      });
  });
});

