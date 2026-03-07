require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { connectDB } = require("./config/db");
const { clerkMiddleware, requireAuth, getAuth } = require("@clerk/express");
const { serve } = require("inngest/express");
const { inngest, functions } = require("./config/ingest");

const port = process.env.PORT;
const _dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

app.listen( port , async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
});

app.get("/admin", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the backend of the ecommerce application" });
});

if (process.env.NODE_ENV === "production") {
  const backurl=process.env.BACKEND_URL;
  app.use(express.static(path.join(_dirname, "./admin/dist")));
  app.get("/", (req, res) => {
    res.redirect("https://e-comm-expo.vercel.app/")
  });
}
app.get("/", (req, res) => {
  res.send("development")
});
app.get("/back", (req, res) => {
  res.send("Deployed Server")
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
