import mongoose from 'mongoose';
// import characterSchema from './schemas/CharacterSchema';

const configSchema = mongoose.Schema(
  {
    Day: {
      type: Number,
      required: true,
    },
    Characters: {
      type: Object,
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

const Config = mongoose.model('Config', configSchema);

export default Config;
