import mongoose from 'mongoose';

const tableSchema = mongoose.Schema(
  {
    Day: {
      type: String,
      required: true,
    },
    Characters: {
      type: String,
      required: true,
    },
    Scores: {
      type: [Number],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Table = mongoose.model('Table', tableSchema);

export default Table;
