const mongoose = require("mongoose");
const User = require('./../users/users.model');

const locationSchema = new mongoose.Schema (
    {
        coords: {type: String },
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        title: {type: String },
        description: {type: String },
        availability: {type: String },
        availability2: {type: String },
        type: {type: String },
        propertyType: {type: String },
        image: {type: String},
        capacity: {type: String}
    }
)
const Location = mongoose.model("location", locationSchema);

const articleSchema = new mongoose.Schema (
    {
        category: {type: String, required: true},
        title: {type: String, required: true},
        text: {type: String },
        rating: {type: String },
        image: {type: String },
    }
)
const Article = mongoose.model("article", articleSchema);

const suitcaseSchema = new mongoose.Schema (
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        location: {type: mongoose.Schema.Types.ObjectId, ref: 'location'},
        date_in: {type: String },
        date_out: {type: String },
        time_in: {type: String },
        time_out: {type: String },
        isAccepted: {type: String, default: false },
        cuantity: {type: Number },
    }
)
const Suitcase = mongoose.model("suitcase", suitcaseSchema);

module.exports = {
    Location, 
    Article,
    Suitcase,
};