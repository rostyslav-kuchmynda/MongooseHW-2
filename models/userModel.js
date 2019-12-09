const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        min: 4,
        max: 50,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        min: 3,
        max: 60,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        enum: ["admin", "writer", "guest"],
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString().slice(0, 10)
    },
    numberOfArticles: {
        type: Number,
        default: 0
    },
    nickname: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('User', UserSchema);