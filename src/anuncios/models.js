const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema (
    {
        coords: {type: String, required: true},
        owner: {type: String, required: true},
        description: {type: String },
        type: {type: String, required: true },
        propertyType: {type: String, required: true },
        images: [{type: String}],
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
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        location: {type: Schema.Types.ObjectId, ref: 'Location'},
        date_in: {type: String },
        date_out: {type: String },
        isAccepted: {type: String },
        cuantity: {type: Number },
    }
)
const Suitcase = mongoose.model("suitcase", suitcaseSchema);

module.exports = {
    Location, 
    Article,
    Suitcase
};