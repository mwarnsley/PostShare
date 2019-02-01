// This is where we describe all of the data for the User Object
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    // Property ('createdBy) === path
    // ref ('User') === model
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: [
        {
            messageBody: {
                type: String,
                required: true
            },
            messageDate: {
                type: Date,
                default: Date.now
            },
            messageUser: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ]
});

module.exports = mongoose.model('Post', PostSchema);