require('dotenv').config();
const mongoose = require('mongoose');

module.exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(" ✅ Connected to MongoDB");
    } catch (error) {
        console.error(" ❌ Error connecting to MongoDB:", error);
        process.exit(1); 
    }
};
