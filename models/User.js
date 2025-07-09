const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'trainer', 'admin'],
        default: 'user'
    },

    // If the user is a customer, they can have a trainer assigned
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    // Optional profile object for additional role-specific data
    profile: mongoose.Schema.Types.Mixed

}, { timestamps: true });

// Hashed password in authController
// userSchema.pre('save',async function(next){
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

module.exports = mongoose.model('User', userSchema);