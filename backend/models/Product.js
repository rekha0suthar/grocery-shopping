const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)