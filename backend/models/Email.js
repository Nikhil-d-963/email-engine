const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messageId: { type: String, required: true, unique: true },
    subject: { type: String },
    sender: { type: String },
    snippet: { type: String },
    read: { type: Boolean, default: false },
    labels: [String],
});

module.exports = mongoose.model('Email', emailSchema);
