// improting our mongoose and models
const mongoose = require('mongoose');
// i npm installed mongoose type email because it helps validate that its correct
require('mongoose-type-email');
const { Schema, model } = mongoose;
const Thought = require('./Thought');
// setting up userschema
const userSchema = new Schema(
    {
        
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        // validating email using unique, required and email
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true,
        },
        // associated thoughts
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        // friendslist
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
         // telling mongodb it contains virtuals
        toJSON: {
            virtuals: true
        },
        id: false
    }
);
// virtual func
userSchema.virtual('friendCount').get(function() {
    return `${this.friends.length}`
});
// exporting user and the schema
const User = model('User', userSchema);
module.exports = User;