const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    descripton:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    color:{
        type: [String],
        required: true,
    },
    size:{
        type: [String],
        required: true,
    },

})

const Product = mongoose.model('product',productSchema)

module.exports = Product