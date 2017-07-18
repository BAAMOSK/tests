const assert = require('assert');
const User = require('../src/user');


describe('Reading users out of the database', () => {
  let tee;

  beforeEach( done => {
    tee = new User({ name: 'Tee' });
    tee.save()
      .then(() => done());
  });

  it('finds all users with a name of Tee', (done) => {
    User.
      find({ name: 'Tee'})
      .then((users) => {

        assert(users[0]._id.toString() === tee._id.toString());
        done();
      });
  });

  it('find a user with a particular id', done => {
    User.findOne({ _id: tee._id })
    .then( user => {

      assert(user.name === 'Tee');
      done();
    });
  });

});