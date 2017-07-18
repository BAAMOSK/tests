const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

  it('can create a subdocument', done => {
    const tee = new User({
      name: 'Tee',
      posts: [{ title: 'Bootcamp' }]
    });

  tee.save()
    .then(() => User.findOne({ name: 'Tee' }))
    .then(user => {
      assert(user.posts[0].title === 'Bootcamp');
      done();
    });
  });

  it('can add subdocuments to an existing record', done => {
    const tee = new User({ name: 'Tee', posts: [] });

    tee.save()
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing document', done => {
    const tee = new User({ name: 'Tee', posts: [{ title: 'New Title' }] });

    tee.save()
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Tee' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });

});