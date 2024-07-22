const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  date: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  savedPets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
  ownedPets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
