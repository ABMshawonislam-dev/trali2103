const mongoose = require('mongoose')
const {Schema} = mongoose

const productPositionSchema = new Schema({
    label:{
        type: String,
        required: true,
        unique: true
    },
    value:{
        type: String,
        required: true,
        unique: true
    }
})

const Productposition = mongoose.model('productposition',productPositionSchema)

module.exports = Productposition