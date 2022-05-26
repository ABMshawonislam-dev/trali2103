const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: String,
        isVendor: {
            type: Boolean,
            default: false
        },


    }
)

const User = mongoose.model("user",userSchema)

module.exports = User