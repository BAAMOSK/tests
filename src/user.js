const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String,
          required: [true, 'Name is required.'],
          validate: {
            validator: name => name.length > 2,
            message: 'Name must be longer than 2 characters.'
          }
        },
  posts: [PostSchema]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;