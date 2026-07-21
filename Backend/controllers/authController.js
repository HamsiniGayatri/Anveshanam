const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {

        const {
            studentId,
            name,
            email,
            password,
            confirmPassword
        } = req.body;

        // Validation
        if (!studentId || !name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match."
            });
        }

        const existingStudent = await User.findOne({
    studentId
});

if (existingStudent) {
    return res.status(400).json({
        message: "Student ID already registered."
    });
}

const existingEmail = await User.findOne({
    email
});

if (existingEmail) {
    return res.status(400).json({
        message: "Email already registered."
    });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
    studentId,
    name,
    email,
    password: hashedPassword
});

res.status(201).json({
    message: "Registration Successful",
    user
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


exports.loginUser = async (req, res) => {
    try {

        const { studentId, password } = req.body;

        if (!studentId || !password) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        const user = await User.findOne({ studentId });

        if (!user) {
            return res.status(400).json({
                message: "Student ID not found."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect Password."
            });
        }

        const token = jwt.sign(
        {
            id: user._id,
            studentId: user.studentId,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                studentId: user.studentId,
                email: user.email,
                role:user.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};