const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({

   
    name: {
        type: String,
        required: true
    },

    branch: {
        type: String,
        required: true
    },

    collegeId: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    itemName: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    status: {
    type: String,
    enum: ["Available", "Pending", "Claimed"],
    default: "Available"
}

}, {
    timestamps: true
    
});

module.exports = mongoose.model("FoundItem", foundItemSchema);