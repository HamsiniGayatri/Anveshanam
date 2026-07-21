const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");

require("dotenv").config();


const createAdmin = async()=>{

    try{

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");


        const existingAdmin = await User.findOne({
            studentId:"ADMIN001"
        });


        if(existingAdmin)
        {
            console.log("Admin already exists");
            process.exit();
        }


        const hashedPassword = await bcrypt.hash(
            "security123",
            10
        );


        const admin = await User.create({

            studentId:"ADMIN001",

            name:"Security Office",

            email:"security@pragati.ac.in",

            password:hashedPassword,

            role:"admin"

        });


        console.log("Admin Created Successfully");

        console.log(admin);


        process.exit();


    }
    catch(error)
    {
        console.log(error);
        process.exit();
    }

};


createAdmin();