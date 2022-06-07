const mongoose = require('mongoose')
const { schema } = require('./usermodel')
const {Schema} = mongoose

const storenameSchema = new Schema({
    storename:{
        type: String,
        required: true,
        unique: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    ownername:{
        type: String,
        required: true,
    }
})

const Storename = mongoose.model('storename',storenameSchema)
module.exports = Storename