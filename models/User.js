const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema, model } = mongoose;
const Thought = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function() {
    return `${this.friends.length}`
});

const User = model('User', userSchema);
module.exports = User;