import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  'year': Number,
  'title': String,
  'description': String,
});

const dayFacts = new Schema({
  'date': String,
  'events': [eventSchema]
});

const Facts = model('Facts', dayFacts);

export default Facts;
