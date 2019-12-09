const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const articleSchema = new Schema({
    title: {
        type: String,
        min: 5,
        max: 400,
        trim: true,
        required: [true, 'Article should have a title'],
        createIndexes: true
    },
    subtitle: {
        type: String,
        trim: true,
        min: 5
    },
    description: {
        type: String,
        min: 5,
        max: 5000,
        trim: true,
        required: [true, 'Article should have a description']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner is required']
    },
    category: {
        type: String,
        trim: true,
        enum: ["sport", "games", "history"],
        required: [true, 'Article should have a category']
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString().slice(0, 10),
    },
    updatedAt: {
        type: Date,
        required: [true, 'Article should have date when it was updated at']
    }
})

module.exports = mongoose.model('Article', articleSchema);

