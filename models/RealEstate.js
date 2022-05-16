const mongoose = require('mongoose');

const {Schema} = mongoose;

const RealEstateSchema = new Schema({
    "id": {type: String, required: true},

    "link": String,

    "price": Number,

    "address": {"street": String, "numberOfHouse": String},

    "rooms": Number,

    "square": Number,

    "squareKitchen": Number,

    "floorFlat": Number,

    "floorHouse": Number,

    "page": Number,

    "typeOfPurchase": String,

    "description": String,

    "typeOfObject": String,

    "balcony": Boolean,

    "loggia": Boolean,

    "deadlineCompletion": Number,

    "yearOfConstruction": Number,

    "images": [String],

});

module.exports = mongoose.model('RealEstate', RealEstateSchema);