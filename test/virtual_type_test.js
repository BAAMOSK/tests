const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {

  it('postCount returns number of posts', done => {
    const tee = new User({ name: 'Tee', posts: [{ title: 'PostTitle' }]});

    tee.save()
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        assert(tee.postCount === 1);
        done();
      });

  });

});