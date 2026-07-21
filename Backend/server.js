const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const claimRoutes = require("./routes/claimRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/account", accountRoutes);


app.use("/api/auth", authRoutes);


app.get("/", (req,res) => {
    res.send("anveshanam backend is running");
});

app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});