import mongoose from 'mongoose';
import solutionSchema from './schemas/solutionSchema.js';

const solutionsSchema = mongoose.Schema({
  Day: {
    type: String,
    required: true,
  },
  Solutions: {
    type: [solutionSchema],
    required: true,
    default: [],
  },
});

const Solutions = mongoose.model('Solutions', solutionsSchema);

export default Solutions;
