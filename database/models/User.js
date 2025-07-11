const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { 
        type: String,
        default: '',
        require: true,
        unique: true
    },
    passwordHash: {
        type: String,
        default: '',
        require: true,
        unique: false,
    },
    name	: {
        type: String,
        default: '',
        require: true,
        unique: false,
    },
    contactPhone: {
        type: String,
        default: '',
        require: false,
        unique: false,
    }
});

module.exports = mongoose.model('User', userSchema);