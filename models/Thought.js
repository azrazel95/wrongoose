// improting our mongoose and models
const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
// requiring the reaction schema
const Reaction = require('./Reaction')

const thoughtsSchema = new Schema (
    {
        //thoughttext must be a string and may be no longer than 280 chars
        thoughtText: {
            type: String,
            required: true,
            max_length: 280
        },
        // date getter
        createdAt: {
            type: Date,
            default: Date.now()
        },
        username: {
            type: String,
            required: true
        },
        // inserts the reaction array so it can ahve associated reactions
        reactions: [Reaction]
    },
    {
         // telling mongodb it contains virtuals and getters
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//reaction virtual func
thoughtsSchema.virtual("reactionCount").get(function() {
    return `${this.reactions.length}`;
});
// exporting our model and schema
const Thought = mongoose.model('Thought', thoughtsSchema);
module.exports = Thought;