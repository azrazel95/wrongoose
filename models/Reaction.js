//creating the reaction schema
const { Schema } = require("mongoose");
const mongoose = require('mongoose');


// setting up the schema
const reactionSchema = new Schema (
    {
        // giving reactions an objectid
      reactionId: {
         type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId() 
        },
        //reactionbody must be a string and may be no longer than 280 chars
        reactionBody: {
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



module.exports =  reactionSchema;