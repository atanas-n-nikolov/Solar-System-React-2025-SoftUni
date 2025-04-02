import { Schema, Types, model } from 'mongoose';

const planetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Star', 'Planet'],
  },
  image: {
    type: String,
    required: true,
  },
  distanceToSun: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: { type: Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }
  ],
});

const Planet = model('Planet', planetSchema);

export default Planet;
