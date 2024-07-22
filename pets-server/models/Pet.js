const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
  type: { 
    type: String, 
    enum: ['Dog', 'Cat'], 
    required: true 
  },
  name: { type: String, required: true },
  adoptionStatus: { 
    type: String, 
    enum: ['Adopted', 'Fostered', 'Available'], 
    required: true 
  },
  imageUrl: { type: String }, 
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  color: { type: String },
  bio: { type: String },
  hypoallergenic: { type: Boolean, default: false },
  dietaryRestrictions: { type: String },
  breed: { type: String },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', default: null }, 
  savedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created: { type: Date, default: Date.now },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
