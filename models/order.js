// add mongoose
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    firstName: {
        type: String,
        required: 'Name is Required',
        trim: true
    },
    lastName: {
        type: String,
        required: 'Name is Required',
        trim: true
    },
    type: {
        type: String
    },
    size: {
        type: String
    },
    quantity: {
        type: Number
    },
    total: {
        type: Number
    }
})

// make the class public
module.exports = mongoose.model('Order', orderSchema);