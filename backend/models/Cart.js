const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Cart', cartSchema)