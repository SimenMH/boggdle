import mongoose from 'mongoose';

const solutionSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
    default: '',
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  usages: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default solutionSchema;
