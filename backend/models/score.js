const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  difficulty: {
    type: String,
    required: true,
  },
  timeCount: {
    type: Number,
    required: true,
  },
  turns: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Score = mongoose.model('Score', schema);

module.exports = Score;