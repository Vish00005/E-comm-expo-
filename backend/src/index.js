require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(3055, () => {
  console.log("Server is running on port http://localhost:3055");
});
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "hellooo1234567890",
    resave: false,
    saveUninitialized: true,
    cookie: function (req) {
      let match = req.url.match(/^\/([^/]+)/);
      return {
        path: match ? "/" + match[1] : "/",
        httpOnly: true,
        secure: req.secure || false,
        maxAge: 60000,
      };
    },
  }),
);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);

    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.redirect("http://localhost:5173/");
});

app.use("/api/auth", authRoutes);
