require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { isAuth } = require("./middleware/auth");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-comm-expo.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "hellooo1234567890",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
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

if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.redirect("https://e-comm-expo.vercel.app");
  });
}
app.get("/hello", (req, res) => {
  console.log("hello");
  res.send(req.session.user);
});
app.get("/", (req, res) => {
  res.redirect("http://localhost:5173/");
});
app.use("/api/auth", authRoutes);
app.use("/check", isAuth, (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(req.session.user);
});
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
