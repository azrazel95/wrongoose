const { Schema } = require("mongoose");
const mongoose = require('mongoose');

// requiring the reaction schema
const Thought = require('./Thought')

const reactionSchema = new Schema (
    {
      reactionId: {
         type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId() 
        },
        reactionBody: {
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
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);



module.exports =  reactionSchema;