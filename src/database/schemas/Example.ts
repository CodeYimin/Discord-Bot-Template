import mongoose from 'mongoose';

const Example = new mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  exampleValue: {
    type: mongoose.SchemaTypes.String,
    required: false,
  }
});

export default mongoose.model('Example', Example);