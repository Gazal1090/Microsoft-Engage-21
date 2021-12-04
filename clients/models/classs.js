const { text } = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema({
    className : {type: String},
    createdBy : { 
        type: mongoose.Schema.Types.ObjectId,
    },
    seats:{type: Array, default:['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1']},
}, {timestamps: true})

module.exports = mongoose.model('Class',classSchema)