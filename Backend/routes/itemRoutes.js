const express = require("express");
const router = express.Router();
const FoundItem = require("../models/FoundItem");

// Get one item by ID

router.get("/:id", async (req, res) => {

    try {

        const item = await FoundItem.findById(req.params.id);

        if (!item) {

            return res.status(404).json({
                message: "Item not found"
            });

        }

        res.json(item);

    }

    catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, "uploads/");
    },

    filename: function(req, file, cb){

        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

//api creation

router.post("/", upload.single("image"), async (req,res) => {
    try{
        const {
            name,
            branch,
            collegeId,
            location,
            itemName,
            color
        } = req.body;

        const newItem = new FoundItem({

            name,
            branch,
            collegeId,
            location,
            itemName,
            color,

            image: req.file.filename

        });

        await newItem.save();

        res.status(201).json({

            success: true,
            message: "Item uploaded successfully",

            item: newItem

        });
    }

    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

// ============================
// GET ALL ITEMS
// ============================

router.get("/", async (req, res) => {

    try {

        const items = await FoundItem.find().sort({ createdAt: -1 });
        console.log(items);

        res.status(200).json(items);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch items"
        });

    }

});

module.exports = router;
