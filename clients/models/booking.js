const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    className : {type:String},
    createdBy : { 
        type: mongoose.Schema.Types.ObjectId,
    },
    seat: {type:Number},
    mode: {type: String},
}, {timestamps: true})

module.exports = mongoose.model('Booking',bookingSchema)