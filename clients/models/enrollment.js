const mongoose = require('mongoose')
const Schema = mongoose.Schema

const enrollmentSchema = new Schema({
    className : {type:String},
    createdBy : { 
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {type: String, default:'0'}
}, {timestamps: true})

module.exports = mongoose.model('Enroll',enrollmentSchema)