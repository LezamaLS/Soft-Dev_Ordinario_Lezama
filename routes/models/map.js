const mongoose = require('mongoose')

const mapSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    sites:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Map', mapSchema)