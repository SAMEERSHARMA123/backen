const mongoose = require('mongoose');

const user = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true
        }
    })
    module.exports = mongoose.model('students',user);

