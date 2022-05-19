const mongoose = require('mongoose')

const weaponSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    group:{
        type: String,
        required: true
    },
    noise:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Weapon', weaponSchema)