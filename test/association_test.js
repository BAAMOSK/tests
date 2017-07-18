const mongoose = require('mongoose');
const assert = require('assert');
//Capital letters are Model Class
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  //lowecase are model instances
  let tee, blogPost, comment;

  beforeEach(done => {
    tee =  new User({ name: 'Tee' });
    blogPost = new BlogPost({ title: 'Node.js', content: 'Association testing' });
    comment = new Comment({ content: 'How do these things connect?' });

    tee.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = tee;

    Promise.all([tee.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Tee' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'Node.js');
        done();
      });
  });

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Tee' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Tee');
        assert(user.blogPosts[0].title === 'Node.js');
        assert(user.blogPosts[0].comments[0].content === 'How do these things connect?');
        assert(user.blogPosts[0].comments[0].user.name === 'Tee');
        // console.log(user.blogPosts[0].comments[0].user.blogPosts[0]);
        done();
      });
  });

});