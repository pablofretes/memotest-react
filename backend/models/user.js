const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 4
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 4
    },
    score: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score',
    }],
});

const User = mongoose.model('User', schema);

module.exports = User;