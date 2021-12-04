const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    className : {type:String},
    createdBy : { 
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {type: String},
    body: {type: String},
}, {timestamps: true})

module.exports = mongoose.model('Post',postSchema)