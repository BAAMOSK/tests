const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let tee;

  beforeEach(done => {
    tee = new User({ name: 'Tee' });
    tee.save()
      .then(() => done());
  });

  it('model instance remove', done => {
    tee.remove()
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', done => {
    // User.remove({ name: 'Tee'})
    User.remove({ _id: tee._id })
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', done => {
    User.findOneAndRemove({ name: 'Tee'})
      .then(() => User.findOne({ name: 'Tee'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', done => {
    User.findByIdAndRemove(tee._id)
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

});