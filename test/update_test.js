const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let tee;

  beforeEach(done => {
    tee = new User({ name: 'Tee', postCount: 0 });
    tee.save()
    .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find())
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance using set and save method', done => {
    tee.set('name', 'Alex');
    assertName(tee.save(), done);
  });

  it('a model instance can update', done => {
    assertName(tee.update({ name: 'Alex' }), done);
  });

  it('a model class can update', done => {
    assertName(
      User.update({ name: 'Tee'}, { name: 'Alex' }),
      done);
  });

  it('a model class can update one record', done => {
    assertName(
      User.findOneAndUpdate({ name: 'Tee' }, { name: 'Alex' }),
      done);
  });

  it('a model class can find a record with an Id and update', done => {
    assertName(
      User.findByIdAndUpdate(tee._id, { name: 'Alex'}),
      done);
  });

  xit('a user can have their post count incremented by 1', done => {
    User.update({ name: 'Tee'}, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });

});

