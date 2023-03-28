const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
// requiring the reaction schema
const Reaction = require('./Reaction')

const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//returning the length of the reactions
thoughtsSchema.virtual("reactionCount").get(function() {
    return `${this.reactions.length}`;
});
const Thought = mongoose.model('Thought', thoughtsSchema);
module.exports = Thought;