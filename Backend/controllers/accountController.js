
const FoundItem = require("../models/FoundItem");
const Claim = require("../models/Claim");

exports.getStats = async (req, res) => {

    try {

        const lostCount = await LostItem.countDocuments();

        const foundCount = await FoundItem.countDocuments();

        const claimCount = await Claim.countDocuments();

        res.status(200).json({

            lost: lostCount,

            found: foundCount,

            claims: claimCount

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

}