const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true,
    // Add text indexing to title and content fields
    textIndexes: [
        {
            field: 'title',
            weight: 2 // You can adjust the weight based on relevance
        },
        {
            field: 'content',
            weight: 1
        }
    ]
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
