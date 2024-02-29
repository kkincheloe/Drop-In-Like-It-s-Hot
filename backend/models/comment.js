const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        poisId: { type: Number, required: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);