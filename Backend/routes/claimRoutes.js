const express = require("express");
const router = express.Router();

const Claim = require("../models/Claim");
const FoundItem = require("../models/FoundItem");

// ===============================
// Submit a Claim
// ===============================

router.post("/", async (req, res) => {

    try {

        const {

            itemId,
            claimantName,
            branch,
            collegeId,
            phone,
            lostLocation,
            description

        } = req.body;

        // Check if item exists
        const item = await FoundItem.findById(itemId);

        if (!item) {

            return res.status(404).json({
                message: "Item not found"
            });

        }

        // Prevent claims if already claimed
        if (item.status === "Claimed") {

            return res.status(400).json({
                message: "This item has already been claimed."
            });

        }

        // Save claim
        const claim = new Claim({

            itemId,
            claimantName,
            branch,
            collegeId,
            phone,
            lostLocation,
            description

        });

        await claim.save();

        // Update item status
        item.status = "Pending";

        await item.save();

        res.status(201).json({

            message: "Claim submitted successfully.",
            claim

        });


    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

});
// Get all claims
router.get("/", async (req, res) => {
    try {

        const claims = await Claim.find()
            .populate("itemId")
            .sort({ createdAt: -1 });

        res.json(claims);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
});
router.put("/approve/:id", async (req, res) => {

    try {

        const claim = await Claim.findById(req.params.id);

        if (!claim) {

            return res.status(404).json({
                message: "Claim not found"
            });

        }

        claim.status = "Claimed";

        await claim.save();

        await FoundItem.findByIdAndUpdate(
            claim.itemId,
            {
                status: "Claimed"
            }
        );

        res.json({
            message: "Claim Approved"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.put("/reject/:id", async (req, res) => {

    try {

        const claim = await Claim.findById(req.params.id);

        if (!claim) {

            return res.status(404).json({
                message: "Claim not found"
            });

        }

        await Claim.findByIdAndDelete(req.params.id);

        await FoundItem.findByIdAndUpdate(
            claim.itemId,
            {
                status: "Available"
            }
        );

        res.json({
            message: "Claim Rejected"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// ===============================
// Get Claim Statistics
// ===============================

router.get("/stats", async (req, res) => {

    try {

        const total = await Claim.countDocuments();


        const pending = await Claim.countDocuments({
            status:"Pending"
        });


        const claimed = await Claim.countDocuments({
            status:"Claimed"
        });


        const rejected = await Claim.countDocuments({
            status:"Rejected"
        });


        res.json({

            total,
            pending,
            claimed,
            rejected

        });


    } catch(error) {

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

});

module.exports = router;
