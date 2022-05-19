const mongoose = require('mongoose')

const agentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Agent', agentSchema)