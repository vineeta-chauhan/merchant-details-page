const mongoose = require('mongoose');

const merchantDetailSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required:true,
    },
    contactName: {
        type: String,
        required: true,
    },
    Pincode: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    averageDailyTransactions: {
        type: String,
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("merchantDetail", merchantDetailSchema)