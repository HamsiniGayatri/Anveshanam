const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({

    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoundItem",
        required: true
    },

    claimantName: {
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

    phone: {
        type: String,
        required: true
    },

    lostLocation: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Claim", claimSchema);