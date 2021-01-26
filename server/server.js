require('dotenv/config') // npm  dotenv file
require('process')
const express = require("express");
const connectDB = require("./db");
const path = require("path");
const { request } = require("http");
var cors =require('cors')



const app = express();

// Connect Database
connectDB();

// Init MIddleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Server static assets in prodcution
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.use(cors())
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
